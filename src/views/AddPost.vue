<template>
    <div class="row">
        <div class="col s6 offset-s3">
            <h3>Создать пост</h3>
            <div class="input-field col s6">
                <input v-model="title"  id="first_name" type="text" class="validate">
                <label for="first_name">Заголовок поста</label>
                <span class="character-counter" style="float: right; font-size: 12px;">{{title.length}}/14</span>
            </div>
            <div class="input-field col s12">
                <textarea v-model="description" id="textarea1" class="materialize-textarea"/>
                <label for="textarea1">Краткое описание</label>
                <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/120</span>
            </div>
            <div class="input-field col s12">
                <textarea v-model="text" id="textarea2" class="materialize-textarea"/>
                <label for="textarea2">Полное описание</label>
            </div>
            <div class="col">
                <a @click.prevent="newPost" class="waves-effect waves-light btn">Добавить пост</a>
                <span class="character-counter add-post__alert" :class="{active: errorPost === true}">Заполните все поля корректно</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                description: '',
                title: '',
                text: '',
                id: `f${(+new Date).toString(16)}`,
                errorPost: false,
            }
        },
        methods: {
            newPost(){
                if (this.description === '' || this.title === '' || this.text === '' || this.title.length > 14 || this.description.length > 120)
                {
                    this.errorPost = true
                }
                else {
                this.savePost();
                this.description = this.title = this.text = ''
                }
            },
            savePost(){
                const newPost = {
                    description: this.description,
                    title: this.title,
                    text: this.text,
                    id: this.id,
                    commentary: [],
                };
                localStorage.setItem(`${this.id}`, JSON.stringify(newPost))

            }
        }
    }
</script>
<style lang="scss" >
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
</style>