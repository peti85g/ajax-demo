$(function(){
    $('#get-button').on('click', function(){
        $.ajax({
            url:'/stuff',
            contentType:'application/json',
            success: function(res){
                var tBodyElement = $('tbody');
                tBodyElement.html('');
                res.stuff.forEach(function(stuff){
                    tBodyElement.append('\
                     <tr>\
                            <td class="id">' + stuff.id + '</td>\
                            <td><input type="text" class="name" value="' + stuff.name + '"></td>\
                            <td>\
                                <button class="update-button">Update Stuff</button>\
                                <button class="delete-button">Delete Stuff</button>\
                            </td>\
                        </tr>\
                    ');
                });

            }
        });
    });

    $('#create-form').on('submit', function(event){
        //prevent hard refresh
        event.preventDefault();

        var createInput = $('#create-stuff');

        $.ajax({
            url:'/stuff',
            method:'POST',
            contentType:'application/json',
            data: JSON.stringify({name: createInput.val()}),
            success: function(res){
                console.log(res);
                createInput.val('');
                $('#get-button').click();
            }
        })
    });

    $('table').on('click', '.update-button', function(){
        var rowElement = $(this).closest('tr');
        var id = rowElement.find('.id').text();
        var updatedName = rowElement.find('.name').val();

        $.ajax({
            url: '/stuff' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({updatedName: updatedName}),
            success: function(res){
                console.log(res);
                $('#get-button').click();
            }
        });
    });

    $('table').on('click', '.delete-button', function() {
        var rowElement = $(this).closest('tr');
        var id = rowElement.find('.id').text();

        $.ajax({
            url: '/stuff' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(res) {
                console.log(res);
                $('#get-button').click();
            }
        });
    });
});