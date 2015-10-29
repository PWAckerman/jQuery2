$(document).ready(function(){
  var x = localStorage.getItem('listo') || undefined;
  if(x){
    x = JSON.parse(x);
  }
  console.log(x);
  var listo = x || [];
  for(var i = 0; i < listo.length; i++){
    if(listo[i].task){
        $("#newItemInput").val('');
        $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="arrow-pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
    }
  }
  console.log(localStorage);
  var advanceTask = function(task){
    var modified = task.innerText.trim();
    for(var i = 0; i < listo.length; i++){
      if (listo[i].task === modified) {
        if(listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress'){
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1)
        }
        break;
      }
    }
    task.remove();
  }
  $('#newTaskForm').hide();

  var Task = function(task){
    this.task = task;
    this.id = 'new';
  }

  $(document).on('click', '#item', function(e){
    e.preventDefault();
      var task = this;
      advanceTask(task);
      this.id = 'inProgress';
      $('#currentList').append(this.outerHTML);
      var listoObj = {"contents" : listo};
      localStorage.setItem("listo", JSON.stringify(listo));
  })

  $(document).on('click', '#inProgress', function(e){
      e.preventDefault();
      var task = this;
      task.id = 'archived';
      var changeIcon = task.outerHTML.replace('glyphicon-arrow-rigth', 'glyphicon-remove');
      advanceTask(task);
      $('#archivedList').append(changeIcon);
      var listoObj = {"contents" : listo};
      localStorage.setItem("listo", JSON.stringify(listo));
  })

  $(document).on('click', '#archived', function(e){
    e.preventDefault();
    var task = this;
    advanceTask(task);
    var listoObj = {"contents" : listo};
    localStorage.setItem("listo", JSON.stringify(listo));
  })

  function addTask(task){
    if(task){
        task = new Task(task);
        listo.push(task);
        $("#newItemInput").val('');
        $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow-pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        $('#newTaskForm, #newListItem').fadeToggle('fast','linear');
    }
  };

  $('#saveNewItem').on('click', function (e){
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
    var listoObj = {"contents" : listo};
    localStorage.setItem("listo", JSON.stringify(listo));
  });

  $('#newListItem').on('click', function(){
      $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  })



});
