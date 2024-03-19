const COHORT = "2402-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;


const state = {
  parties: []
};


const mainBody = document.querySelector(`main`);


const render = async () => {
  await getParties();
  renderState();
}


const getParties = async () => {
  try {
    const response = await fetch(API_URL);

    const json = await response.json();
    
    if(json.success) {
      state.parties = json.data;
    }
  }
  catch(error) {
    console.error(`You have an error!!!\n\n`, error);
  }
  
}

const renderState = () => {
  
  const ulTags = state.parties.map(() => document.createElement(`ul`));
  
  for(i in state.parties) {
    
    const dateAndTime = state.parties[i].date;
    const dateAndTimeArray = dateAndTime.split(`T`);
    
    const name = state.parties[i].name;
    const date = dateAndTimeArray.shift();

    // I went overboard on the time...
    const militaryTime = dateAndTimeArray.join(`:`).slice(0, 5);
    const hours = militaryTime.slice(0, 2);
    const minutes = militaryTime.slice(3);

    let time;
    if(Number(hours) === 0) {
      time = `12:${minutes} AM`;
    }
    else if(Number(hours) === 12) {
      time = `12:${minutes} PM`;
    }
    else if(Number(hours) > 12) {
      time = `${hours - 12}:${minutes} PM`;
    }
    else {
      time = `${militaryTime} AM`;
    }

    const location = state.parties[i].location;
    const description = state.parties[i].description;

    const stats = [name, date, time, location, description];

    const liTags = stats.map((stat) => {
      const current_li = document.createElement(`li`);
      current_li.innerText = stat;
      return current_li;
    });
    
    ulTags[i].replaceChildren(...liTags);
  }

  mainBody.replaceChildren(...ulTags);
  
  
}


render();




