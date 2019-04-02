<template>
    <div>
        {{  msg  }}
        <div class="container">
            <div class="row">
                <div class='col-md-8 row-left'>
                    
                    <button class="add-hotspot btn btn-success" @click='addMethod'>新增一条话题</button>
                    <input type="input" class='topic_title' v-model='topic_title' placeholder="请输入资讯标题">
                    <br>
                    <select v-model='board_id' class="board_id">
                        <option v-for="(board, index) in boards" :key='index' :value='board._id'>{{ board.board_content}}</option>
                    </select>



                    <div class="upload-main">
                        <label for="exampleInputFile">Add Pic</label>
                        <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;" multiple>
                        <button class="add-pic-one-button">上传</button>
                    </div>
                    <br>


                    <div class="markdown-wrapper">
                        <div class="markdown-text">
                            <textarea style="width: 330px; height: 500px;">
    # H1
    ## H2
    ### H3
    #### H4
    ##### H5
    ###### H6

    Alternatively, for H1 and H2, an underline-ish style:

    Alt-H1
    ======

    Alt-H2
    ------

    Emphasis, aka italics, with *asterisks* or _underscores_.

    Strong emphasis, aka bold, with **asterisks** or __underscores__.

    Combined emphasis with **asterisks and _underscores_**.

    Strikethrough uses two tildes. ~~Scratch this.~~

    1. First ordered list item
    2. Another item
      * Unordered sub-list.
    1. Actual numbers don't matter, just that it's a number
      1. Ordered sub-list
    4. And another item.

       You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

       To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
       Note that this line is separate, but within the same paragraph.⋅⋅
       (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

    * Unordered list can use asterisks
    - Or minuses
    + Or pluses

    [I'm an inline-style link](https://www.google.com)

    [I'm an inline-style link with title](https://www.google.com "Google's Homepage")

    [I'm a reference-style link][Arbitrary case-insensitive reference text]

    [I'm a relative reference to a repository file](../blob/master/LICENSE)

    [You can use numbers for reference-style link definitions][1]

    Or leave it empty and use the [link text itself]

    Some text to show that the reference links can follow later.

    [arbitrary case-insensitive reference text]: https://www.mozilla.org
    [1]: http://slashdot.org
    [link text itself]: http://www.reddit.com

    Here's our logo (hover to see the title text):

    Inline-style:
    ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

    Reference-style:
    ![alt text][logo]

    [logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

    Inline `code` has `back-ticks around` it.

    ```javascript
     var s = "JavaScript syntax highlighting";
     alert(s);
    ```

    ```python
     s = "Python syntax highlighting"
     print s
    ```

    ```
     No language indicated, so no syntax highlighting.
     But let's throw in a <b>tag</b>.
    ```

    Colons can be used to align columns.

    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |

    The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

    Markdown | Less | Pretty
    --- | --- | ---
    *Still* | `renders` | **nicely**
    1 | 2 | 3

    > Blockquotes are very handy in email to emulate reply text.
    > This line is part of the same quote.

    Quote break.

    > This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

    <dl>
      <dt>Definition list</dt>
      <dd>Is something people use sometimes.</dd>

      <dt>Markdown in HTML</dt>
      <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
    </dl>

    Three or more...

    ---

    Hyphens

    ***

    Asterisks

    ___

    Underscores

    Here's a line for us to start with.

    This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

    This line is also a separate paragraph, but...
    This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
                            </textarea>    
                        </div>
                        <div class="markdown"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 topic write 的页面！',
            topic_write_link: 'http://127.0.0.1:4000/topic/write',
            topic_add_link: 'http://127.0.0.1:4000/topic/api/add',
            boards: '',
            board_id: '',
            topic_title: '',
        }
    },
    methods: {
        get_write() {
            axios.get(this.topic_write_link).then(res => {
                log('请求 topic write 成功, 这是给出的响应:', res.data)
                this.boards = res.data.boards
            }).catch(res => {
                log('请求 topic write 失败')
            })
        },
        addMethod() {
            log('新增按钮被点击！')
            axios.post(this.topic_add_link, {
                board_id: this.board_id,
                topic_title: this.topic_title,
                topic_content: e('.markdown-body').innerHTML,
            }).then(res => {
                log('新增请求成功！', res)
            }).catch(res => {
                log('新增请求失败')
            })
        }
    },
    created() {
        this.get_write()
    }
    
}
</script>

<style scoped>
    @import '../../../static/m1/css/style.css';
    @import '../../../static/css/index.css';

    .actives {
        width: 50px;
        height: 20px;
        text-align: center;
        border: 1px solid beige;
        background-color: lightcoral;
        display: inline-block;
        border-radius: 4px;
    }


</style>


