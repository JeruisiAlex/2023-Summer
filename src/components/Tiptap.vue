<template>
      <div style="height: 30px;">
        <el-row style=" color: black;">
            <el-col :span="14" style="font-size: large; font-weight: bold; text-overflow: ellipsis;-o-text-overflow: ellipsis; white-space: nowrap; max-width: 100%; display: block;">{{ fileName }}</el-col>
            <el-col :span="10" style="text-align: right;">
              权限设置: 
              <el-switch
                    v-if="permissionStatus"
                    v-model="is_shared"
                    inline-prompt
                    active-text="已分享"
                    inactive-text="未分享"
                    style="--el-switch-on-color: #2a9feb; --el-switch-off-color: #24292e"
                    @click="changeShare()"
                />
                <span v-else>暂无权限</span>
                <el-switch
                    v-if="is_shared && permissionStatus"
                    v-model="is_write"
                    inline-prompt
                    active-text="允许游客编辑"
                    inactive-text="禁止游客编辑"
                    style="--el-switch-on-color: #2a9feb; --el-switch-off-color: #24292e"
                    @click="changeEdit()"
                />
            </el-col>
          </el-row>
    </div>
    <div class="editor" v-if="editor">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content class="editor__content" :editor="editor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length === 1 ? '' : 's' }} online in {{ room }}
          </template>
          <template v-else>
            offline
          </template>
        </div>
        <div class="editor__name">
          <template v-if="status === 'connected'">
            {{ editor.storage.characterCount.characters() }} characters
          </template>
          <button @click="setName">
            {{ currentUser.name }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { TiptapCollabProvider } from '@hocuspocus/provider'
  import CharacterCount from '@tiptap/extension-character-count'
  import Collaboration from '@tiptap/extension-collaboration'
  import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
  import Highlight from '@tiptap/extension-highlight'
  import TaskItem from '@tiptap/extension-task-item'
  import TaskList from '@tiptap/extension-task-list'
  import StarterKit from '@tiptap/starter-kit'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import * as Y from 'yjs'
  import { getAText, saveText} from '@/api/text.js'
  import { ElMessage } from 'element-plus'
  
  import { variables } from './variables.js'
  import MenuBar from './MenuBar.vue'
  import Mention from '@tiptap/extension-mention'
  import suggestion from './suggestion.js'
  import store from '@/store'

  
  const getRandomElement = list => {
    return list[Math.floor(Math.random() * list.length)]
  }
  
  const getRandomRoom = () => {
    const roomNumbers = variables.collabRooms?.trim()?.split(',') ?? [10, 11, 12]
  
    return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
  }
  
  export default {
    components: {
      EditorContent,
      MenuBar,
    },
  
    data() {
      return {
        currentUser: {
          name: store.state.isLogin?store.state.userName:'游客',
          color: this.getRandomColor(),
        },
        provider: null,
        editor: null,
        status: 'connecting',
        room: '文档获取中...',
        group_id: 0,
        project_id: 0,
        text_id: 0,
        fileName: '文档获取中...',
        is_write: false,
        is_shared: false,
        permissionStatus: true,
      }
    },
  
    mounted() {
      var url = this.$route.path;
      var infos = url.split('/');
      this.group_id = parseInt(infos[1]);
      this.project_id = parseInt(infos[2]);
      this.text_id = parseInt(infos[3]);
      const ydoc = new Y.Doc()
      var promise=getAText(parseInt(infos[3]),parseInt(infos[2]));
      promise.then((result)=>{
        if(this.MessageCatch(result, true)){
        this.fileName = result.data.name;
        this.room = this.fileName + ' - ID:' + this.text_id;
        this.provider = new TiptapCollabProvider({
          appId: 'x9ll8v9r',
          name: this.room,
          document: ydoc,
        })
    
        this.provider.on('status', event => {
          this.status = event.status
        })
    
        this.editor = new Editor({
          extensions: [
            StarterKit.configure({
              history: false,
            }),
            Highlight,
            TaskList,
            TaskItem,
            Collaboration.configure({
              document: ydoc,
            }),
            CollaborationCursor.configure({
              provider: this.provider,
              user: this.currentUser,
            }),
            CharacterCount.configure({
              limit: 10000,
            }),
            Mention.configure({
              HTMLAttributes: {
                class: 'mention',
              },
              suggestion,
            }),
          ],
          autofocus: 'end',
        })
        }
      });

      // localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
  
    methods: {

      changeShare() {

      },
      changeEdit() {

      },

      MessageCatch(data,opcode){
      if(data.code!=0){
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'error',
        })
        return false;
      }
      if(opcode==true&&data.code==0){
        ElMessage({
          message: data.msg,
          grouping: true,
          type: 'success',
        })
      }
      return true;
    },

      setName() {
        const name = (window.prompt('Name') || '')
          .trim()
          .substring(0, 32)
  
        if (name) {
          return this.updateCurrentUser({
            name,
          })
        }
      },
  
      updateCurrentUser(attributes) {
        this.currentUser = { ...this.currentUser, ...attributes }
        this.editor.chain().focus().updateUser(this.currentUser).run()
  
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      },
  
      getRandomColor() {
        return getRandomElement([
          '#958DF1',
          '#F98181',
          '#FBBC88',
          '#FAF594',
          '#70CFF8',
          '#94FADB',
          '#B9F18D',
        ])
      },
  
      getRandomName() {
        return getRandomElement([
          'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
        ])
      },
    },
  
    beforeUnmount() {
      this.editor.destroy()
      this.provider.destroy()
    },
  }
  </script>
  
  <style lang="scss">
  
  .mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
  }

  .notification-item {
    align-items: center;
    /*justify-content: center;*/
    height: 30px;
    line-height: 30px;
    margin: 5px;
    /*padding-left: 5px;*/
    text-align: center;
    border-radius: 4px;
    color: black;
    transition: 0.5s;
    overflow: hidden;
    border-bottom: rgba(42, 159, 235, 0.5) 1px solid;
  }

  .notification-item:hover {
    cursor: pointer;
    background: rgba(236, 245, 255, 1);
    /* color: rgb(42, 159, 235); */
    transition: 0.2s;
  }

  .editor {
    background-color: #FFF;
    border: 3px solid #0D0D0D;
    border-radius: 0.75rem;
    color: #0D0D0D;
    display: flex;
    flex-direction: column;
    height: 80vh;
    // max-height: 80vh;
  
    &__header {
      align-items: center;
      background: #0d0d0d;
      border-bottom: 3px solid #0d0d0d;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      display: flex;
      flex: 0 0 auto;
      flex-wrap: wrap;
      padding: 0.25rem;
    }
  
    &__content {
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0rem 1rem;
      -webkit-overflow-scrolling: touch;
    }

    .ProseMirror {
        border-color: transparent !important;
        box-shadow: none !important;
        outline: none !important;
    }
  
    &__footer {
      align-items: center;
      border-top: 3px solid #0D0D0D;
      color: #0D0D0D;
      display: flex;
      flex: 0 0 auto;
      flex-wrap: wrap;
      font-size: 12px;
      font-weight: 600;
      justify-content: space-between;
      padding: 0.25rem 0.75rem;
      white-space: nowrap;
    }
  
    /* Some information about the status */
    &__status {
      align-items: center;
      border-radius: 5px;
      display: flex;
  
      &::before {
        background: rgba(#0D0D0D, 0.5);
        border-radius: 50%;
        content: ' ';
        display: inline-block;
        flex: 0 0 auto;
        height: 0.5rem;
        margin-right: 0.5rem;
        width: 0.5rem;
      }
  
      &--connecting::before {
        background: #616161;
      }
  
      &--connected::before {
        background: #B9F18D;
      }
    }
  
    &__name {
      button {
        background: none;
        border: none;
        border-radius: 0.4rem;
        color: #0D0D0D;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
  
        &:hover {
          background-color: #0D0D0D;
          color: #FFF;
        }
      }
    }
  }
  
  /* Give a remote user a caret */
  .collaboration-cursor__caret {
    border-left: 1px solid #0D0D0D;
    border-right: 1px solid #0D0D0D;
    margin-left: -1px;
    margin-right: -1px;
    pointer-events: none;
    position: relative;
    word-break: normal;
  }
  
  /* Render the username above the caret */
  .collaboration-cursor__label {
    border-radius: 3px 3px 3px 0;
    color: #0D0D0D;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    left: -1px;
    line-height: normal;
    padding: 0.1rem 0.3rem;
    position: absolute;
    top: -1.4em;
    user-select: none;
    white-space: nowrap;
  }
  
  /* Basic editor styles */
  .tiptap {
    > * + * {
      margin-top: 0.75em;
    }
  
    ul,
    ol {
      padding: 0 1rem;
    }
  
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }
  
    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  
    pre {
      background: #0D0D0D;
      border-radius: 0.5rem;
      color: #FFF;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
  
      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }
  
    mark {
      background-color: #FAF594;
    }
  
    img {
      height: auto;
      max-width: 100%;
    }
  
    hr {
      margin: 1rem 0;
    }
  
    blockquote {
      border-left: 2px solid rgba(#0D0D0D, 0.1);
      padding-left: 1rem;
    }
  
    hr {
      border: none;
      border-top: 2px solid rgba(#0D0D0D, 0.1);
      margin: 2rem 0;
    }
  
    ul[data-type="taskList"] {
      list-style: none;
      padding: 0;
  
      li {
        align-items: center;
        display: flex;
  
        > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }
  
        > div {
          flex: 1 1 auto;
        }
      }
    }
  }
  </style>