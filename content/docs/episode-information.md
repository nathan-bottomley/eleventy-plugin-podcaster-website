# Episode information

Each episode of your podcast should have an associated Eleventy template, with a `podcastEpisode` tag. The front matter of this template will contain the necessary information about the episode, and the content of the template will be the show notes.

## Front matter

The important information about each of your podcast episodes — the title, the date, the filename, the episode number, the size, the duration — should be made available in an `episode` object in the front matter of a post with an `podcastEpisode` tag, like this:

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
  size: 61231442
  duration: 3283
  explicit: no
  episodeType: full
excerpt: >-
  A big week for beginnings this week, with a new Doctor, 
  a new origin story for the Daleks, and a whole new approach 
  to defeating the bad guys. Oh, and a new podcast to discuss 
  them all on. So let’s welcome Patrick Troughton to the studio
  floor, as we discuss _The Power of the Daleks_.
---
```

Here's a detailed description of the data you need to provide here.

| field | value | required? |
| ----- | ----- | ----- |
| `title` | The title of the episode; this will also be the title of the post on the website. | yes |
| `date` | The release date of the episode; this will also be the date of the post on the website | yes |
| `tags` | Every episode post must have the tag `podcastEpisode` included in the `tags` array. Other tags are also permitted. | yes |
| `guid` | A unique ID for the post. Normally this will be the post's URL, in which case there is no need to provide it here. It's should really only be necessary to provide it if you're importing the podcast from some other system that has assigned a guid to each post.  | no |
| `episode.title` | The title of the episode if it's different from the title of the post, above. If omitted, `title` is used instead. | no |
| `episode.description` | A short textual description of the episode. If omitted, the `content` of the post, truncated to about 800 characters, will be used instead. | no |
| `episode.filename` | The filename of the episode's audio file. | yes |
| `episode.size` | The size of the episode's audio file in bytes. | yes |
| `episode.duration` | The duration of the episode as a number of seconds. You can convert this to `h:mm:ss` format using Podcaster's `readableDuration` filter. | yes |
| `episode.episodeNumber` | The episode number. Needn't be unique, but the combination of `seasonNumber` and `episodeNumber` must be unique. | yes |
| `episode.seasonNumber` | The season number. (Most podcasts don't group their episodes into seasons.) | no |
| `episode.image` | The path or URL for an image specific to this episode. | no |
| `episode.explicit` | Warns listeners that this episode contains explicit language. Should be used for a single episode in a podcast that isn't itself marked as explicit. | no |
| `episode.type` | The type of episode. Defaults to `full`, meaning a full episode of the podcast. Other valid types are `trailer` and `bonus`. | no |
| `episode.transcript` |  The path or URL for a file containing a transcript of this episode. It should be a file in VTT or SRT format. | no |
| `episode.block` |  If the value here is true or truthy, the episode will be blocked from appearing in the Apple Podcasts Directory. | no |
| `excerpt` | A shorter version of the content of the post, written in Markdown. For use in lists of episodes where the show notes are long. For other ways of providing excerpts to **Podcaster**, check out its [optional excerpts feature][excerpts]. | no |

[excerpts]: /docs/optional-features.md#excerpts

> [!TIP]
> It's possible for **Podcaster** to calculate the size and duration for each episode if it has access to your episode audio files. [Read more to find out how](docs/size-and-duration.md).

> [!TIP]
> It's also possible for **Podcaster** to automatically create an `excerpt` for each episode. [Read more to find out how](/docs/optional-features.md#excerpts).
