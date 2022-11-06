<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'img_url' => $this->img ? URL::to($this->img) : null,
            'slug' => $this->slug,
            'url' => $this->url,
            'status' => $this->status,
            'desc' => $this->desc,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d'),
            'comments' => $this->comments,



        ];
    }
}