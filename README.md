# Plumber local proxy

Local proxy for client side user review.

## Install

[Plumber](https://chrome.google.com/webstore/detail/plumber/fnmbainnppmofhjllmcmdbapnjnbphch)

## Usage

### Load json

  https://gist.githubusercontent.com/cw-ago/a8cdf7c1009629f1e0e0/raw/5ab176c98bef144255415fa5f489b0fbad596c34/manifest.json

### Access test site

[Plumber test](http://jsrun.it/kyo_ago/svzA)

### json format

  {
    "name": "Test manifest",
    "urls": [
      // URL pattern(e.g. "*://*")
      "http://jsrun.it/kyo_ago/svzA/js"
    ],
    "matchs": [
      {
        // Regexp(e.g. ".*")
        "url": "http://jsrun.it/kyo_ago/svzA/js",
        // URL
        "redirect": "https://cdn.rawgit.com/cw-ago/a8cdf7c1009629f1e0e0/raw/0a6dbb9d20e0e04a1bba3f4cd09bde20cf2e9c6d/replace.js"
      }
    ]
  }

## License

MIT License

