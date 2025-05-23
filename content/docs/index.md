---
title: 'eleventy-plugin-podcaster'
eleventyNavigation:
  key: Documentation
  order: 1
---

## Installation

To install the npm package, type this at the command line:

```shell
npm install eleventy-plugin-podcaster
```

And then include the plugin in your Eleventy configuration file.

```javascript
// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster)
  .
  .
}
```

## Podcast information

Once you've installed **Podcaster** in your Eleventy project, the next step is to provide it with information about your podcast — the title, the owner, the category, the subcategory and so on. The easiest way to do this is to put the information in your data directory in a `podcast.json` file.

Here's an example.

```json
{
  "title": "Flight Through Entirety: A Doctor Who Podcast",
  "description": "Flying through the entirety of Doctor Who. Originally with cake, but now with guests.",
  "siteUrl": "https://flightthroughentirety.com",
  "author": "Flight Through Entirety",
  "category": "TV & Film",
  "language": "en-AU",
}
```

[Read more about podcast information.](podcast-information.md)

## Episode information

For each podcast episode you create, you will also create a corresponding Eleventy template. This template will have the tag `podcastEpisode`, and its front matter will contain the information about the episode — the title, the release date, the episode number, the filename and so on. Its content will contain the episode's show notes.

Here's an example.

```yaml
---
title: Entering a new Phase
date: 2024-04-14
tags:
  - podcastEpisode
episode:
  filename: 500YD S1E1, Entering a New Phase.mp3
  seasonNumber: 1
  episodeNumber: 1
  size: 61231442 # bytes
  duration: 3778.482 # seconds
---
A big week for beginnings this week, with a new Doctor, a new origin story
for the Daleks, and a whole new approach to defeating the bad guys. Oh, and
a new podcast to discuss them all on. So let's welcome Patrick Troughton 
to the studio floor, as we discuss _The Power of the Daleks_.
```

[Read more about episode information.](episode-information.md)

### Getting **Podcaster** to work out your episode information

That seems like quite a lot of information to supply for each episode. But **Podcaster** can workout `episode.filename`, `episode.size` and `episode.duration` for you.

To allow it to do this, you need to have a single local directory that contains all of your podcast's MP3 files. You provide **Podcaster** with the path to that directory, and it can do the rest.

[Read more about getting **Podcaster** to work out your episode information.](filename-size-and-duration.md)

## The podcast feed

**Podcaster** uses the information you have provided about your podcast and its episodes to create the podcast feed.

By default, your podcast feed will be located at `/feed/podcast.xml`, which means that the URL you submit to Apple Podcasts or Spotify (or wherever) will be `{% raw %}{{ podcast.siteUrl }}{% endraw %}/feed/podcast.xml`

## Using podcast information and episode information in templates

All the podcast and episode information you provide is made available to your templates through the data cascade, including `title` and `date`, as well as fields in the `podcast` and `episode` objects.

Here's how you might use this information to describe a single podcast episode in a Liquid template.

{% raw %}

```liquid
<article>
  <h1>{{ title }}</h1>
  <p class="episode-number">Episode {{ episode.episodeNumber }}</p>
  <p class="release-date">{{ date | date: "%A %-e %B %Y" }}</p>
  <section class="content">
    {{ content }}
  </section>
  <audio controls src="{{ episode.url }}" preload="none">
  <p class="audio-details">
    Episode {{ episode.episodeNumber }}: {{ title }}
    | Recorded on {{ recordingDate | date: "%A %-e %B %Y" }}
    | {{ episode.size | readableSize }}
    | Duration {{ episode.duration | readableDuration }}
    | <a download href="{{ episode.url }}">Download</a>
  </p>
</article>
```

{% endraw %}

All podcast episode templates belong to the `collections.podcastEpisode` collection, which means you can list several episodes on a single page using [Eleventy's pagination feature][pagination]. In that case, each episode's  information will be available in its [collection item data structure][item].

[pagination]: https://www.11ty.dev/docs/pagination/
[item]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

[Read more about using podcast information and episode information in templates.](information-in-templates.md)

## Hosting

You can host your podcast site — along with its feed — [the same way you would host any Eleventy site][hosting], using [a Jamstack provider][] linked to your source control repository or using [a classic web host][] which will allow you to upload the contents of your output directory.

[hosting]: https://www.11ty.dev/docs/deployment/
[a Jamstack provider]: https://www.11ty.dev/docs/deployment/#jamstack-providers
[a classic web host]: https://www.11ty.dev/docs/deployment/#classic-web-hosts

However, your podcast episode files should be hosted somewhere else, preferably on a Content Delivery Network (CDN), which will let your listeners download your episodes promptly and quickly.

To find out how to set this up and how to make this work with **Podcaster**, [read more about hosting your podcast episode files][episode-file-hosting].

[episode-file-hosting]: hosting.md

## Optional features

**Podcaster** also implements some optional features which are useful for creating podcast websites — **drafts**,  **excerpts**, a **`readableDate` filter**, a **`pageTitle`** attribute, and automatic episode permalinks.

These are not fundamental features of a podcast website, which is why they are opt-in. You can activate them by passing options to the `addPlugin` method in your configuration file.

```javascript
    eleventyConfig.addPlugin(Podcaster, {
      handleDrafts: true,
      handleExcerpts: true,
      readableDateLocale: 'en-GB',
      calculatePageTitle: true, 
      handleEpisodePermalinks: true
    })
```

[Read more about optional features.](optional-features.md)

## Podcaster in action

I started podcasting and creating podcasting websites in 2014. At first I used Squarespace, then WordPress, and then Jekyll, before finally settling on Eleventy late in 2022.

I now have eight podcast websites built with Eleventy and **Podcaster**;  **Podcaster** itself was derived from the code I originally used to create them.

Here's the list:

- [Flight Through Entirety](https://flightthroughentirety.com), a _Doctor Who_ podcast flying through the entirety of the show's 60-something-year history.
- [Untitled Star Trek Project](https://untitledstartrekproject.com), a _Star Trek_ commentary podcast, where two friends watch _Star Trek_ episodes from across the franchise, chosen (nearly) at random using [a page on the podcast website](https://untitledstartrekproject.com/randomiser).
- [500 Year Diary](https://500yeardiary.com), another _Doctor Who_ podcast, where we look at the show's themes and ideas and some of the people involved in its creation.
- [The Second Great and Bountiful Human Empire](https://thesecondgreatandbountifulhumanempire.com), a _Doctor Who_ flashcast, where we give our initial reactions to each episode of the post-2023 era of the show.
- [Startling Barbara Bain](https://startlingbarbarabain.com), a commentary podcast on _Space: 1999_, a lavish and generally ridiculous British scifi show from the 1970s.
- [Maximum Power](https://maximumpowerpodcast.com), a podcast about _Blakes 7_, a less lavish but more ridiculous British scifi show from the 1970s.
- [Bondfinger](https://bondfinger.com), a James Bond commentary podcast that soon ran out of James Bond films and ended up spending its time drinking and watching terrible TV shows from the 1960s.
- [Jodie into Terror](https://jodieintoterror.com), our original _Doctor Who_ flashcast, where we gave our initial reactions to each episode of _Doctor Who_’s Jodie Whittaker Era.

## Licence

This plugin is available as open source under the terms of the [ISC License](https://opensource.org/licenses/ISC).
