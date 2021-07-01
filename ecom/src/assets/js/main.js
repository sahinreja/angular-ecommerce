// const btn = document.getElementById('btn');
$(document).ready(()=>{
    console.log('running');
    $('.navbar-toggler').click(()=>{
        $('#sidebar').show(800)
    })
    $('.close').click(()=>{
       $('#sidebar').hide(800)
    })
})