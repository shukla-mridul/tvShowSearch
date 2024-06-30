const showSearch=document.querySelector('#showsearch');
const showName=document.querySelector('#showname');
// const airDate=document.querySelector('#airdate');
const minRating=document.querySelector('#minrating');
const searchBtn=document.querySelector('#searchbtn');
const displaySection=document.querySelector('#display');

const preDisplayShows=(shows,rating=10)=>{
    for(let show of shows){
       
        try{
        // console.log(show);
        // console.log(show.name);
        // console.log(show.image.medium);
        let container=document.createElement('div');
        let img=document.createElement('img');
        let title=document.createElement('p');
        img.setAttribute('src',show.image.medium);
        title.innerText=show.name + `  -rating : ${show.rating.average}`;
        container.append(img);
        img.after(title);
        displaySection.append(container);
        // // console.log(show.show.name,show.show.rating.average);
        }catch (e){
            console.log(e,"unavkaibae");
        }

        

    }
}

const renderShows=async()=>{
    const showsMetaData =await axios.get('https://api.tvmaze.com/shows');
    let showDetails=showsMetaData.data.splice(0,60);
    console.log(showDetails);
    preDisplayShows(showDetails);
}
// preemptively hsowing shows!
renderShows();

const getFormData=()=>{
    const showDetails={
        name: `${showName.value}`,
        // dateAired:`${airDate.value}`,
        minimumRating:`${minRating.value}`
    };
    return showDetails;
    
}

const displayShows=(shows,rating=10)=>{
    for(let show of shows){
       
        try{
        if(show.show.rating.average<rating){
            continue;
        }
        // console.log(show.show.name);
        // console.log(show.show.image.medium);
        let container=document.createElement('div');
        let img=document.createElement('img');
        let title=document.createElement('p');
        img.setAttribute('src',show.show.image.medium);
        title.innerText=show.show.name + `  -rating : ${show.show.rating.average}`;
        container.append(img);
        img.after(title);
        displaySection.append(container);
        // console.log(show.show.name,show.show.rating.average);
        }catch (e){
            console.log(e,"unavkaibae");
        }

        

    }
}

showSearch.addEventListener('submit',async(evt)=>{
    evt.preventDefault();
    displaySection.innerHTML='';
    const showDetails=getFormData();
    const config={params:{q:showDetails.name}};
    let baseUrl='https://api.tvmaze.com/search/shows';
    // let url=baseUrl+showDetails.name;
    // console.log(url);
    // let airQurl='';
    // if(showDetails.dateAired){
    //     airQurl='&date='+showDetails.dateAired;
    //     console.log(airQurl);
    // }
    let shows=await axios.get(baseUrl,config);
    // console.log(shows.data);
    displayShows(shows.data,showDetails.minimumRating);
    // showName.value='';
})