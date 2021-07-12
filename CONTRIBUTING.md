# Contributing to Jina

Thanks for your interest in contributing to Jina console. We're grateful for your initiative! ❤️

# Join Us on Slack!

The best way to know more about contributing and how to get started is to **[join us on Slack](https://join.slack.com/t/jina-ai/shared_invite/zt-dkl7x8p0-rVCv~3Fdc3~Dpwx7T7XG8w)** and ask questions in our public channels.

In this guide we're going to go through the steps for each kind of contribution, and good and bad examples of what to do. We look forward to your contributions!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [🏁 Before you Start](#-before-you-start)
- [🐞 Bugs and Issues](#-bugs-and-issues)
- [💻 Running Console locally](#-running-console-locally)
- [☑️ Naming Conventions](#-naming-conventions)
- [🧪 Testing Locally and on CI](#-testing-locally-and-on-ci)
- [📖 Contributing Documentation](#-contributing-documentation)
- [💬 Getting Support](#-getting-support)
- [🙏 Thank You](#-thank-you)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="-before-you-start"></a>
## 🏁 Before you Start

Make sure you've read through our [README](https://github.com/jina-ai/jina), [Jina 101](https://101.jina.ai), and [example tutorials](https://learn.jina.ai) so you have a good understanding of what Jina is and how it works.

### Not a coder but still want to contribute?

We're happy for any contributions, code or not. If you'd like to write a blog post, record a podcast, organize a meetup, or anything else to contribute to Jina, we'd love to hear from you!

* [Contribute docs](#contributing-documentation)
* For other contributions, please [get in touch](#getting-support) to discuss on Slack

<a name="-bugs-and-issues"></a>
## 🐞 Bugs and Issues

### Submitting Issues

We love to get issue reports. But we love it even more if they're in the right format. For any bugs you encounter, we need you to:

* **Describe your problem**: What exactly is the bug. Be as clear and concise as possible
* **Why do you think it's happening?** If you have any insight, here's where to share it

There are also a couple of nice to haves:

* **Environment:** You can find this with `jina --version-full`
* **Screenshots, Logs:** If they're relevant

### Fixing and Discussing Issues

Right now we're working on a list of things we want help with and easy-to-fix bugs suitable for first-time contributors. Stay tuned to:

* [Good first issues](https://github.com/jina-ai/dashboard/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
* [Help wanted](https://github.com/jina-ai/dashboard/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
* [Discussion required](https://github.com/jina-ai/dashboard/issues?q=is%3Aopen+is%3Aissue+label%3A%22discussion+required%22)

<a name="-running-console-locally"></a>
## 💻 Running Console locally

### Setup the project locally

0. Fork this repository by clicking on fork button on the top right. This will create a copy of this repository on your account.
1. Clone your fork. 
    Get the URL of your fork by clicking on `code` button on GitHub.
    Clone it to your local with command `git clone <URL you copied>`

    `git clone https://github.com/<your-username>/dashboard.git`.
1. Install dependencies using command `npm i`.
    `cd dashboard`
    `npm i`
1. Run dashboard via the following ways .

### Run in the debug mode

0. `npm run start_dev-server`

    testServer will be running on `http://localhost:5000` by default
1. `npm run dashboard start`

    Dashboard will be served on `http://localhost:3000` by default

### Run in the live mode

1. `npm run dashboard build`
2. `node dashboard`
3. dashboard will be served on `http://localhost:3030` by default

Note: features like the hub and GitHub login will not work when running locally as they are restricted to the `dashboard.jina.ai` origin. They are not necessary to view logs or interact with flows. If you would like to browse the hub do so from [dashboard.jina.ai](https://dashboard.jina.ai/).

0. Associate your local git config with your github account. If this is your first time using git you can follow [the steps](#associate-with-github-account).
1. Fork the Jina repo and clone onto your computer. By default, `git` won't clone `jina/hub` as it is a submodule maintained at [`jina-ai/jina-hub`](https://github.com/jina-ai/jina-hub). Please follow [the steps](#check-out-jina-hub-submodule) for details. 
1. Create a [new branch](#naming-your-branch), for example `fix-jina-typo-1`.
1. Work on this branch to do the fix/improvement.
1. Check if your code changes follow the [code review guidelines](.github/CODE_REVIEW_GUIDELINES.md).
1. Commit the changes with the [correct commit style](#writing-your-commit-message).
1. Make a pull request. 
1. Submit your pull request and wait for all checks to pass.
1. Request reviews from one of [the code owners](.github/CODEOWNERS).
1. Get a LGTM 👍 and PR gets merged.

**Note:** If you're just fixing a typo or grammatical issue, you can go straight to a pull request.

### Associate with github account

- Confirm username and email on [your profile page](https://github.com/settings/profile).
- Set git config on your computer.

```shell
git config user.name "YOUR GITHUB NAME"
git config user.email "YOUR GITHUB EMAIL"
```

- (Optional) Reset the commit author if you made commits before you set the git config.

```shell
git checkout YOUR-WORKED-BRANCH
git commit --amend --author="YOUR-GITHUB-NAME <YOUR-GITHUB-EMAIL>" --no-edit
git log  # to confirm the change is effective
git push --force
```

<a name="-naming-conventions"></a>
## ☑️ Naming Conventions

For branches, commits, and PRs we follow some basic naming conventions:

* Be descriptive
* Use all lower-case
* Limit punctuation
* Include one of our specified [types](#specify-the-correct-types)
* Short (under 70 characters is best)
* In general, follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) guidelines

Note: If you don't follow naming conventions, your commit will be automatically flagged to be fixed.

### Specify the correct types

Type is an important prefix in PR, commit message. For each branch, commit, or PR, we need you to specify the type to help us keep things organized. For example,

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests
- chore: updating grunt tasks etc; no production code change

### Naming your Branch

Your branch name should follow the format `type-scope(-issue_id)`:

* `type` is one of the [types above](#specify-the-correct-types)
* `scope` is optional, and represents the module your branch is working on.
* `issue_id` is [the GitHub issue](https://github.com/jina-ai/jina/issues) number. Having the correct issue number will automatically link the Pull Request on this branch to that issue. 

> Good examples:
> 
```text
fix-executor-loader-113
chore-update-version
docs-add-cloud-section-33
```

> Bad examples:
>

| Branch name     | Feedback                                              |
| ---             | ---                                                   |
| `FIXAWESOME123` | Not descriptive enough, all caps, doesn't follow spec |
| `NEW-test-1`    | Should be lower case, not descriptive                 |
| `mybranch-1`    | No type, not descriptive                              |

### Writing your Commit Message

A good commit message helps us track Jina's development. A Pull Request with a bad commit message will be *rejected* automatically in the CI pipeline.

Commit messages should stick to our [naming conventions](#naming-conventions) outlined above, and use the format `type(scope?): subject`:

* `type` is one of the [types above](#specify-the-correct-types).
* `scope` is optional, and represents the module your commit is working on.
* `subject` explains the commit, without an ending period `.`

For example, a commit that fixes a bug in the executor module should be phrased as: `fix(executor): fix the bad naming in init function`

> Good examples:
> 
```text
fix(indexer): fix wrong sharding number in indexer
feat: add remote api
```

> Bad examples:
>

| Commit message                                                                                | Feedback                           |
| ---                                                                                           | ---                                |
| `doc(101): improved 101 document`                                                             | Should be `docs(101)`              |
| `tests(flow): add unit test for flow exception`                                               | Should be `test(flow)`             |
| `DOC(101): Improved 101 Documentation`                                                        | All letters should be in lowercase |
| `fix(pea): i fix this pea and this looks really awesome and everything should be working now` | Too long                           |
| `fix(pea):fix network receive of the pea`                                                     | Missing space after `:`            |
| `hello: add hello-world`                                                                      | Type `hello` is not allowed          |

#### What if I Mess Up?

We all make mistakes. GitHub has a guide on [rewriting commit messages](https://docs.github.com/en/free-pro-team@latest/github/committing-changes-to-your-project/changing-a-commit-message) to they can adhere to our standards.

You can also install [commitlint](https://commitlint.js.org/#/) onto your own machine and check your commit message by running:

```bash
echo "<commit message>" | commitlint
```

### Naming your Pull Request

We don't enforce naming of PRs and branches, but we recommend you follow the same style. It can simply be one of your commit messages, just copy/paste it, e.g. `fix(readme): improve the readability and move sections`.

<a name="-testing-locally-and-on-ci"></a>
## 🧪 Testing Jina Locally and on CI

We use [jest](https://jestjs.io/) for unit tests and [cypress](https://www.cypress.io/) for integration tests.

To run unit tests, run `npm test`

To run integration tests, run `npm run cy:run`


<a name="-contributing-documentation"></a>
## 📖 Contributing Documentation

Good docs make developers happy, and we love happy developers! We've got a few different types of docs:

* General documentation
* Tutorials/examples
* Docstrings in Python functions in RST format - generated by Sphinx

#### General Documentation

This covers files like [Jina 101](https://github.com/jina-ai/jina/tree/master/docs/chapters/101), [Input and Output Functions, etc](https://github.com/jina-ai/jina/blob/master/docs/chapters/io/index.md).

These are typically written in Markdown, though some may be in RestructuredText.

If you're just correcting a typo, feel free to make a pull request. For bigger ones, check out our [getting support section](#getting-support) to get in touch and discuss more.

#### Tutorials and Examples

This is anything under the [Jina Examples](https://github.com/jina-ai/examples) repo.

If you're submitting a new example, be sure to get a good grounding in Jina, go through our previous examples, and test your code.

If you're making small tweaks to an existing example, make a pull request. For bigger ones, check out our [getting support section](#getting-support) to get in touch and discuss more.

#### Docstrings

Docstrings are how we document Jina's functions. This is suitable for more experienced documentation writers who understand Python functions, docstring formatting, and RestructuredText format. 

#### Building Documentation Locally

To build documentation locally, you need Docker installed. Clone this repository and run the following command: 

```bash
bash ./scripts/make-doc.sh serve 8080
```

The documentation is then available in your browser at [`http://0.0.0.0:8080/`](http://0.0.0.0:8080/).

<a name="-getting-support"></a>
## 💬 Getting Support

We're always happy to lend a hand, answer questions, or listen to feedback. You find us here:

* [Documentation](http://docs.jina.ai)
* [Slack](https://join.slack.com/t/jina-ai/shared_invite/zt-dkl7x8p0-rVCv~3Fdc3~Dpwx7T7XG8w)

We're also looking at starting online developer hangouts, so you can catch up with us over chat and video, and get to meet your fellow Jina contributors.

<a name="-thank-you"></a>
## 🙏 Thank You

Once again, thanks so much for your interest in contributing to Jina. We're excited to see your contributions!
