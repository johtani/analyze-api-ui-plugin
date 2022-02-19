# analyze-api-ui-plugin

> UI for elasticsearch analyze API

Analyze text with Analyzer
![Sample image](docs/sample_image.jpg)

This branch is for Kibana 7.x.

## How to use?

See [Getting Started](docs/GETTING_STARTED.md)

## Installation
The latest stable version is for kibana 7.6.2.

| Kibana version | Command                                                                                                                         |
|----------------|---------------------------------------------------------------------------------------------------------------------------------|
| 7.16.2         | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.16.2/analyzeApiUi-7.16.2.zip` |
| 7.6.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.6.2/analyze_api_ui-7.6.2.zip` |
| 7.6.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.6.2/analyze_api_ui-7.6.2.zip` |
| 7.6.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.6.1/analyze_api_ui-7.6.1.zip` |
| 7.6.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.6.0/analyze_api_ui-7.6.0.zip` |
| 7.5.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.5.2/analyze_api_ui-7.5.2.zip` |
| 7.5.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.5.1/analyze_api_ui-7.5.1.zip` |
| 7.5.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.5.0/analyze_api_ui-7.5.0.zip` |
| 7.4.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.4.2/analyze_api_ui-7.4.2.zip` |
| 7.4.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.4.1/analyze_api_ui-7.4.1.zip` |
| 7.4.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.4.0/analyze_api_ui-7.4.0.zip` |
| 7.3.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.3.2/analyze_api_ui-7.3.2.zip` |
| 7.3.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.3.1/analyze_api_ui-7.3.1.zip` |
| 7.3.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.3.0/analyze_api_ui-7.3.0.zip` |
| 7.2.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.2.0/analyze_api_ui-7.2.0.zip` |
| 7.1.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.1.1/analyze_api_ui-7.1.1.zip` |
| 7.1.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.1.0/analyze_api_ui-7.1.0.zip` |
| 7.0.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.0.1/analyze_api_ui-7.0.1.zip` |
| 7.0.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/7.0.0/analyze_api_ui-7.0.0.zip` |

<details>
  <summary>Older versions (6.7.1 - 6.1.2)</summary>

| Kibana version | Command                                                                                                                                |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 6.7.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.7.1/analyze-api-ui-plugin-6.7.1.zip` |
| 6.7.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.7.0/analyze-api-ui-plugin-6.7.0.zip` |
| 6.6.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.6.2/analyze-api-ui-plugin-6.6.2.zip` |
| 6.6.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.6.1/analyze-api-ui-plugin-6.6.1.zip` |
| 6.6.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.6.0/analyze-api-ui-plugin-6.6.0.zip` |
| 6.5.4          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.5.4/analyze-api-ui-plugin-6.5.4.zip` |
| 6.5.3          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.5.3/analyze-api-ui-plugin-6.5.3.zip` |
| 6.5.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.5.2/analyze-api-ui-plugin-6.5.2.zip` |
| 6.5.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.5.1/analyze-api-ui-plugin-6.5.1.zip` |
| 6.5.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.5.0/analyze-api-ui-plugin-6.5.0.zip` |
| 6.4.3          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.4.3/analyze-api-ui-plugin-6.4.3.zip` |
| 6.4.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.4.2/analyze-api-ui-plugin-6.4.2.zip` |
| 6.4.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.4.1/analyze-api-ui-plugin-6.4.1.zip` |
| 6.4.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.4.0/analyze-api-ui-plugin-6.4.0.zip` |
| 6.3.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.3.2/analyze-api-ui-plugin-6.3.2.zip` |
| 6.3.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.3.0/analyze-api-ui-plugin-6.3.0.zip` |
| 6.2.4          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.2.4/analyze-api-ui-plugin-6.2.4.zip` |
| 6.2.3          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.2.3/analyze-api-ui-plugin-6.2.3.zip` |
| 6.2.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.2.2/analyze-api-ui-plugin-6.2.2.zip` |
| 6.2.1          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.2.1/analyze-api-ui-plugin-6.2.1.zip` |
| 6.2.0          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.2.0/analyze-api-ui-plugin-6.2.0.zip` |
| 6.1.3          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.1.3/analyze-api-ui-plugin-6.1.3.zip` |
| 6.1.2          | `./bin/kibana-plugin install https://github.com/johtani/analyze-api-ui-plugin/releases/download/6.1.2/analyze-api-ui-plugin-6.1.2.zip` |

</details>

## Known issues

* not restore filters/char_filters after moving another tabs [#42](https://github.com/johtani/analyze-api-ui-plugin/issues/42)

## TODO 

* change index name to select
    * preload index_name from _cat/indices
* error handling

---

## Development

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/main/CONTRIBUTING.md) for instructions setting up your development environment.

## Scripts

<dl>
  <dt><code>yarn kbn bootstrap</code></dt>
  <dd>Execute this to install node_modules and set up the dependencies in your plugin and in Kibana</dd>

  <dt><code>yarn plugin-helpers build</code></dt>
  <dd>Execute this to create a distributable version of this plugin that can be installed in Kibana</dd>
</dl>

## Thanks

Thank @risdenk for your great help to upgrade 7.10+!
