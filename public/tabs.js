$(document).ready(function(){
    //when a tab is clicked
      $('ul.tabs li').click(function(){
      //grab the id of the tab
          var id = $(this).attr('tab');
      //change current tab
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');
      //
          $(this).addClass('current');
          $("#" + id).addClass('current');
      })
  
  })