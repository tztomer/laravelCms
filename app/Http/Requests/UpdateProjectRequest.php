<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize()
    {
        // return true;
        $project = $this->route('project');
        if ($this->user()->id !== $project->user_id) {
            return false;
        }
        return true;

    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "title" => "string|max:100",
            "user_id" => 'exists:users,id',
            "desc" => "nullable|string",
            "slug" => "nullable|string",
            "url" => "nullable|string",
            "img" => "nullable|string",
            "status" => 'string|in:Active,Done,Cancel',
            "expire_date" => 'nullable|date|after:tomorrow',
            'comments' => 'array',


        ];
    }
}