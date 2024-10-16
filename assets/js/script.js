
$(document).ready(function () {
    get_comment();

    console.log("Script carregado!");

    $("#form1").submit(function (e) {
        e.preventDefault(); //remover o evento de fazer a requisição http padrão do formulario.
        var u_name = $('#name').val(); //pega o valor do input com o id: name
        var u_comment = $('#comment').val();//pega o valor do input com o id: coment
       //console.log(u_name, u_comment)
       
        $.ajax({
            url: 'http://localhost/ajax2/inserir.php', //para onde vai mandar. o local 
            method: 'POST', //metódo
            data: {
                name: u_name, comment: u_comment //conteúdo
            },
            dataType: 'json'
        }).done(function (result) {
            $('#name').val('');//muda o valor do campo para null
            $('#comment').val('');
            alert("carregou");
            console.log("finalizou");
            console.log(result); // Access the returned message
            get_comment();

        })
    })
    function get_comment() {
        $.ajax({
            url: 'http://localhost/ajax2/selecionar.php',
            method: 'GET',
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            $(".box_comment").empty(); // Limpa os comentários existentes
            for (var i = 0; i < result.length; i++){
                $(".box_comment").prepend('<div class="b_comm"><input readonly id="name_id"  type="text" value="' + result[i].name_c + '"</input> <input readonly  id="coment_id" type="text" value="' + result[i].comment_c + '"</input> <h5 class="id"> ' + result[i].id + '</h5> <button class="edit">editar</button> <button style="display: none;" class="salvar">Salvar</button><button class="excluir" style="background-color:red;">Excluir</button></div> ')

            }
        
        });
     
    }
    $(document).on('click', '.edit', function () {
        var $bComm = $(this).closest('.b_comm');
        var commentId = $bComm.find('.id').text(); // no lugar do find pode se usar o children
    

        $('input').prop('readonly', false);
        var $bComm = $(this).closest('.b_comm');
        var commentId = $bComm.find('.salvar').show();

      /*  $.ajax({
            url: 'http://localhost/ajax2/editar.php', //para onde vai mandar. o local 
            method: 'POST', //metódo
            data: {
                id: commentId //conteúdo
            },
            dataType: 'json'
        }).done(function (result) {
            console.log("finalizou");
            console.log(result); // Access the returned message
            get_comment();

        })
*/


        
    });
    $(document).on('click', '.salvar', function () {
        var $bComm = $(this).closest('.b_comm');
        var commentId = $bComm.find('.id').text();

            // children procura o filho mais proximo. 
        
       // parents busca todos os elementos ancestrais e salva
       // closest ele pega o primeiro elemento ancestral 

        //var teste = $(this).parents('.b_comm').find('.id');
        //children pega o filho mais proximo
        // find pega todos os filhos
    //     var $name = $(this).closest('.b_comm');
    //     var name_id = $name.find('#name_id').text();
    //    alert(name_id)

        var edit_name = $('#name_id').val(); 
        var edit_comment = $('#coment_id').val()
      


        $.ajax({
            url: 'http://localhost/ajax2/editar.php', //para onde vai mandar. o local 
            method: 'POST', //metódo
            data: {
                name: edit_name, comment: edit_comment, id: commentId //conteúdo
            },
            dataType: 'json'
        }).done(function (result) {
            console.log("finalizou");
            console.log(result); // Access the returned message
            get_comment();

        })
        $(".salvar").hide();
        $('input').prop('readonly', true);

        alert("salvo com sucesso")

    
    })



    $(document).on('click','.excluir', function(){
        alert("sadfkasfkasdoc")
        var confirmado = confirm('Deseja deletar?');

        if(confirmado){
            var $bComm = $(this).closest('.b_comm');
            var commentId = $bComm.find('.id').text();
            alert('Confirmado!');
            $.ajax({
                url: 'http://localhost/ajax2/excluir.php', //para onde vai mandar. o local 
                method: 'POST', //metódo
                data: {
                id: commentId //conteúdo
                },
                dataType: 'json'
            }).done(function (result) {
                console.log("finalizou");
                console.log(result); // Access the returned message
                get_comment();

            })
            
        }else{
            alert('Negado!');
        }
      })

})  