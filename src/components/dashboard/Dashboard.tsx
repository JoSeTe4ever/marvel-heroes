import React from "react";
import { Route, Switch } from "react-router-dom";
import { CharactersDetails } from "./../character-details/CharactersDetails";
import { ComicsDetails } from "./../comics-details/ComicsDetails";
import { Home } from "./../home/Home";

const Dashboard: React.FC = () => {
    return <Switch>
        <Route path="/" component={Home} />
        <Route path="/characters" component={CharactersDetails} />
        <Route path="/comics" component={ComicsDetails} />
    </Switch>
}

export default Dashboard;