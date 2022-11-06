<?php

namespace App\Http\Controllers;

// use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\Comment;


use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return ProjectResource::collection(Project::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectRequest $request)
    {
        //
        $data = $request->validated();

        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);
            $data['img'] = $relativePath;
        }

        $project = Project::create($data);


        foreach ($data['comments'] as $comment) {
            $comment['project_id'] = $project->id;
            $this->createComment($comment);
        }



        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $project->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProjectRequest  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();



        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);



            $data['img'] = $relativePath;



            // var_dump($project->img);

            if ($project->img) {
                $absolutePath = public_path($project->img);
                File::delete($absolutePath);
            }
        }



        $project->update($data);


        $dbExistIds = $project->comments()->pluck('id')->toArray();
        // var_dump('ids', $dbExistIds);
        $newCommentsIds = Arr::pluck($data['comments'], 'id');

        // compare the two arrays for new comments and existing ones's
        //1. find for delete comments
        $commentsToDelete = array_diff($dbExistIds, $newCommentsIds);
        //2. find for add comments
        $commentsToAdd = array_diff($newCommentsIds, $dbExistIds);

        // Delete
        Comment::destroy($commentsToDelete);

        // Create new

        foreach ($data['comments'] as $comment) {
            if (in_array($comment['id'], $commentsToAdd)) {
                $comment['project_id'] = $project->id;
                $this->createComment($comment);
            }
        }


        //Update exists ones's
        $commentsToUpdate = collect($data['comments'])->keyBy('id');
        foreach ($project->comments as $comment) {
            if (isset($commentsToUpdate[$comment->id])) {
                $this->updateComment($comment, $commentsToUpdate[$comment->id]);
            }
        }


        return new ProjectResource($project);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $project->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $project->delete();

        // If there is an old image, delete it
        if ($project->img) {
            $absolutePath = public_path($project->img);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createComment($data)
    {

        //  $comment =  Comment::create([]);


        $validator = Validator::make(
            $data,
            [
                'comment' => 'string|nullable',
                'project_id' => 'exists:App\Models\Project,id'

            ]
        );
        return Comment::create($validator->validate());
    }

    private function updateComment(Comment $comment, $data)
    {

        $validator = Validator::make(
            $data,
            [
                'id' => 'exists:App\Models\Comment,id',
                'comment' => 'nullable|string',
            ]
        );


        return $comment->update($validator->validated());

    }
}