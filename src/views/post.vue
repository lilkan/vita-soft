<template>
    <div class="row">
        <div class="col s6 offset-s3 pt-6">
            <div class="row">
                <div class="col s3 m12" v-if="!editable">
                    <div  class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <h5 class="col s8 post__title">{{post.title}}</h5>
                            <a @click.prevent="editMode" class="row waves-effect waves-light btn">Редактировать</a>
                            <span class="card-title post__description">{{post.description}}</span>
                            <span class="card-title">{{post.text}}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="col s3 m12">
                    <div class="input-field col s6">
                        <input v-model="post.title"  id="first_name2" type="text" class="validate">
                        <label for="first_name2">Заголовок поста</label>
                        <span class="character-counter" style="float: right; font-size: 12px;">{{post.title.length}}/14</span>
                    </div>
                    <div class="input-field col s12">
                        <textarea v-model="post.description" id="textarea3" class="materialize-textarea"/>
                        <label for="textarea3">Краткое описание</label>
                        <span class="character-counter" style="float: right; font-size: 12px;">{{post.description.length}}/120</span>
                    </div>
                    <div class="input-field col s12">
                        <textarea v-model="post.text" id="textarea2" class="materialize-textarea post__textarea"/>
                        <label for="textarea2">Полное описание</label>
                    </div>
                    <div class="col">
                        <a @click.prevent="upadatePost" class="waves-effect waves-light btn">Сохранить пост</a>
                        <span class="character-counter add-post__alert" :class="{active: errorPost === true}">Заполните все поля корректно</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s6 offset-s3">
            <ul class="collection col s3 m12">
                <li class="collection-item avatar" v-for="(comm, idx) in post.commentary">
                    <img src="https://loremflickr.com/640/360" alt="" class="circle">
                    <span class="title">{{comm.name}} пишет</span>
                    <p>{{comm.commentary}}</p>
                    <a @click.prevent="deleteComment(idx)" href="#" class="secondary-content"><i class="material-icons">Удалить</i></a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col s6 offset-s3">
                <h5>Оставить комментарий</h5>
                <div class="input-field col s6">
                    <input v-model="name"  id="first_name" type="text" class="validate">
                    <label for="first_name">Ваше имя</label>
                </div>
                <div class="input-field col s12">
                    <textarea v-model="commentary" id="textarea1" class="materialize-textarea"/>
                    <label for="textarea1">Текст комментария</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">{{commentary.length}}/120</span>
                </div>
                <div class="col">
                    <a @click.prevent="newComment" class="waves-effect waves-light btn">Добавить комментарий</a>
                    <span class="character-counter add-post__alert" :class="{active: errorComment === true}">Заполните все поля корректно</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post',
    data(){
        return{
            post: '',
            name: '',
            commentary: '',
            errorComment: false,
            editable: false,
            errorPost: false
        }
    },
    methods: {
        editMode(){
            setTimeout(() => {M.updateTextFields()}, 0);
            this.editable = !this.editable

        },
        upadatePost(){
            if(this.post.title ==='' || this.post.description === '' || this.post.text === '' || this.post.title.length > 14){
                this.errorPost = true
            }
            else {
                localStorage.setItem(`${this.$route.params['id']}`, JSON.stringify(this.post));
                this.editMode()
            }
        },
        newComment(){
            if (this.name === '' || this.commentary === '' || this.commentary.length > 120)
            {
                this.errorComment = true
            }
            else {
            this.saveComment();
            this.description = this.name = this.commentary = ''
            }
        },
        deleteComment(idx){
            this.post.commentary.splice(idx, 1);
            localStorage.setItem(`${this.$route.params['id']}`, JSON.stringify(this.post))
        },
        saveComment(){
            const newComm = {
                commentary: this.commentary,
                name: this.name
            };
            this.post.commentary.push(newComm);
            localStorage.setItem(`${this.$route.params['id']}`, JSON.stringify(this.post))
        }
    },
    mounted() {
        this.post =  JSON.parse(localStorage.getItem(this.$route.params['id']))

    }
}
</script>
<style lang="scss" scoped>
    .add-post__alert{
        opacity: 0;
        transition: .5s;
        padding-left:20px;
        float: right;
        font-size: 12px;
        color: red;
        &.active {
            opacity: 1;
        }
    }
    textarea.post__textarea{
        min-height: 200px;
    }
    .row .col.s8.post__title{
        padding: 0;
        font-size: 40px;
    }
    .card .card-content .card-title.post__description{
        width: 100%;
        display: block;
        float: right;
    }
    .waves-effect{
        margin-top: 20px;
    }
</style>
