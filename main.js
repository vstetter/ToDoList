$(document).ready(function () {
  toDoList.init();
});


var toDoList = {

  init: function () {
    toDoList.initStyling();
    toDoList.initEvents();
  },

  initStyling: function () {
    toDoList.rendertoDoListItem();
  },

  initEvents: function () {

    $('.ActualList').on('click', '.showEditToDoItem', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editToDoItem').toggleClass('show');
    });

    $('.ActualList').on('submit','.editToDoItem', function (event) {
      event.preventDefault();
      var toDoID = $(this).closest('article').data('toDoid');
      var editedToDoItem = {
        toDoItem: $(this).find('input[name="editItem"]').val()
      };

      toDoList.updatetoDoListItem(toDoID, editedToDoItem);
    });

    $('#createItem').on('submit', function (event) {
      event.preventDefault();
      var newToDoItem = {
        toDoItem: $(this).find('input[name="newItem"]').val()
      };
      toDoList.createtoDoListItem(newToDoItem);

    });

    $('.ActualList').on('click', '.deleteItem', function (event) {
      event.preventDefault();
      var toDoID = $(this).closest('article').data('toDoid');
      console.log(toDoID);
      toDoList.deletetoDoListItem(toDoID);
    });
  },

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/vstetter',
    // url: 'http://rh-tiny-server.herokuapp.com/collections/vstetter',
  },


  rendertoDoListItem: function () {
    $.ajax({
      url: toDoList.config.url,
      type: 'GET',
      success: function (toDoList) {
        console.log(toDoList);
        var template= _.template($('#toDoTmpl').html());
        var markup = "";
        toDoList.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is ...', markup);
        $('.ActualList').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  createtoDoListItem: function (listItem) {
    $.ajax({
      url: toDoList.config.url,
      data: listItem,
      type: 'POST',
      success: function (data) {
        console.log(data);
        toDoList.rendertoDoListItem();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  deletetoDoListItem: function (id) {
    $.ajax({
      url: toDoList.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log (data);
        toDoList.rendertoDoListItem();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  updatetoDoListItem: function (id, listItem) {
    $.ajax({
      url: toDoList.config.url + '/' + id,
      data: listItem,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        toDoList.rendertoDoListItem();
      },
      error: function (err) {
        console.log(err);
      }
    });

  },

};
