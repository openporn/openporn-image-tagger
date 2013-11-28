OpenPorn Image Tagger
=====================

**An open source application to let people more easily tag arbitrary images on
Imgur with different metadata**

OpenPorn is trying to classify as many different adult images as possible with
different categories, but having one person do all the work (no matter how 
much fun it might **seem**) is a really hard task.

We're open-sourcing our first project, which is a simple application that lets
you crowdsource image classification.

More importantly, it lets your users help contribute to a productive
scientific task while they fap/schlick/[insert preferred onomatopoeia].

How it Works
------------

The application will generate 12 random Imgur images from a developed-defined 
data source.  In OpenPorn's case, we'll be scraping these images from a set of 
NSFW subreddits.

The user will also get a random tag, and is asked to click on any of the 12
images that correctly describe that tag.

For instance, a user will visit the site and will be given the tag 'anal'. They
then need to click on whichever of the 12 images that contain what they
consider to best represent 'anal', and then hit submit.

After that's done, they'll receive another set of 12 images and a new tag.

In the future, we might add a better gamification system to the system, but
that's a stretch goal at the moment.

Software Architecture
---------------------

This is something that we want to build fast, so it'll be slightly less
well-defined than the main OpenPorn application that we'll be building.

#### Application Foundation

The main application foundation is a Node.js/Express middleware server. 
This provides a RESTful API that will be consumed by our frontend Backbone 
application.

The middleware server is responsible for parsing the data in our datasource
(Reddit, for example) and putting it into a JSON format that the frontend
can more effectively use.

#### Database Design

Because tags are more free-form (a single image can have multiple tags), and
our tagging system follows a more document-oriented architecture, we'll be
using MongoDB as our database of choice.

There are two main collections in our system:

- Tags
- Images

Tags contain the name of the tag, a longer description of the tag, and a
parent category that it belongs to. An example is the following:

```json
{
    name        : 'missionary',
    description : 'Penetrating partner is on top of receiving partner',
    category    : 'positions'
}
```

An image (to save disk space) contains the Imgur ID, and a list of tags that
it contains:

```json
{
    id: 'o4FVCmq',
    tags: [
        'breasts',
        'brunnette',
        'female',
        ...
    ]
}
```

Because we're using Mongo, it's easier for tags to be cross-referenced with
the specific images later on, and we won't need to do any SQL JOINs.

#### Frontend

WIP
