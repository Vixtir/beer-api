export const myThrotlle = (f, ms) => {
  let throttle = false,
      currentArgs;

  return function wrapper(){
    if(throttle){
      currentArgs = arguments;
      return;
    } 
    
    throttle = true;
    f.apply(null, arguments);

    setTimeout(
      function(){
        throttle = false;
        if(currentArgs){
          wrapper.apply(null, currentArgs);
          currentArgs = null;
        }
      }, ms);
  }
}