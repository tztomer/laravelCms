<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\SlugOptions;

use Spatie\Sluggable\HasSlug;


class Project extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = ['user_id', 'title', 'slug', 'status', 'desc', 'expire_date'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugFrom('title')->saveSlugsTo('slug');
    }
}