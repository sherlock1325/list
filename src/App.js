import React from "react"
import {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Components/Home";


function App() {

    const [dataList, SetDataList] = useState([
        {id: 1, FirstName: "Lio", LastName: "Messi", Age: 35, Email: "liomessi@gmail.com"},
        {id: 2, FirstName: "Cristiano", LastName: "Ronaldo", Age: 37, Email: "ronaldu@gmail.com"},
        {id: 3, FirstName: "Junior", LastName: "Neymar", Age: 30, Email: "neymar@gmail.com"},
        {id: 4, FirstName: "Kilian", LastName: "Mbappe", Age: 23, Email: "mbappe@gmail.com"},
        {id: 5, FirstName: "Robert", LastName: "Lewandowski", Age: 33, Email: "lewandowski@gmail.com"},
    ]);

    const AddNewItem = (object) => {
        let newArray = dataList;
        newArray.push(object)
        SetDataList(newArray)
    }

    const Delete = (id) => {

        let ObjectId = dataList.findIndex(obj => obj.id === id)
        dataList.splice(ObjectId, 1)
        SetDataList(dataList)


    }


    const Edit = (id) => {

        let ObjectId = dataList.findIndex(obj => obj.id === id)
        dataList.splice(ObjectId, 1)
        SetDataList(dataList)


    }


    return (

        <div className="container">
            <Router>
                <Switch>
                    <Route exact={true} path="/">
                        <Home Edit={(id) => Edit(id)} Delete={(id) => Delete(id)} data={dataList}
                              AddNewItem={(object) => AddNewItem(object)}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
