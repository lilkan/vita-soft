<template>
    <nav>
        <div class="nav-wrapper cyan darken-3">
            <router-link to="/" class="brand-logo center">Личный блог</router-link>
            <ul id="nav-mobile" class="left hide-on-med-and-downn">
                <router-link tag="li" exact active-class="active" to="/addpost" ><a href="#"> Добавить пост</a></router-link>
            </ul>
        </div>
    </nav>
</template>
<script>
</script>
<style lang="scss" scoped>
    .nav-wrapper{
        padding: 0 20px;
    }
</style>