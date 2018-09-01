const tabElem = document.querySelector(".tabs");
var TabInstance = M.Tabs.init(tabElem, {});

// Function for opening the Username input modal
document.addEventListener('DOMContentLoaded', () => {
   const userSearchModal = document.querySelector("#modal");
   const instances = M.Modal.init(userSearchModal, {dismissible: false});
});

document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.fixed-action-btn');
   var instances = M.FloatingActionButton.init(elems, {});
 });

document.addEventListener('DOMContentLoaded', () => {
   const successModal = document.querySelector("#successModal");
   const success = M.Modal.init(successModal, {});

   try {
      success.open();
   
      setTimeout(() => {
         success.close();
      }, 3000);
   } catch (e) {
      
   }
});

document.addEventListener('DOMContentLoaded', () => {
   const errorModal = document.querySelector("#errorModal");
   const error = M.Modal.init(errorModal, {});

   try {
      error.open();
   
      setTimeout(() => {
         error.close();
      }, 3000);
   } catch (e) {
      
   }
});
