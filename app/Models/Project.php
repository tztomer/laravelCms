<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model
{
    use HasFactory, HasSlug;



    protected $fillable = ['user_id', 'title', 'slug', 'status', 'desc', 'url', 'expire_date', 'img'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(
                'title'
            )
            ->saveSlugsTo(
                'slug'
            );
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

}