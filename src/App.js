import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: 'Employee Name',
            groups: []
        };
        let employees = JSON.parse(localStorage.getItem('employees'));
        if(!employees){
            localStorage.setItem('employees',JSON.stringify(['mike','rick', 'morty','stewie', 'john', 'malcolm', 'josh', 'okay', 'more', 'employee', 'trevor', 'uhmm', 'sure']));
        }
    }

    componentWillMount(){
        this.createGroups();
    }

    onChange(event){
        this.setState({
            value: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        let employees = JSON.parse(localStorage.getItem('employees'));
        employees.push(this.state.value);
        localStorage.setItem('employees',JSON.stringify(employees));
        this.createGroups();
    }

    createGroups(){
        let employees = JSON.parse(localStorage.getItem('employees'));
        let numberOfEmployees = employees.length;
        let maxGroupSize = 5;
        let minGroupSize = 4;
        let currentGroupSize = maxGroupSize;
        let remainingEmployees = numberOfEmployees % currentGroupSize;
        let numberOfGroupsPerSize = {};
        numberOfGroupsPerSize[currentGroupSize] = Math.floor(numberOfEmployees / currentGroupSize);

        while(remainingEmployees > 0){
            if(remainingEmployees < minGroupSize){
                numberOfGroupsPerSize[currentGroupSize]--;
                remainingEmployees += currentGroupSize;
            }else{

                let nextGroupSize = currentGroupSize - 1;
                while(nextGroupSize >= minGroupSize){

                    if(nextGroupSize > remainingEmployees){
                        nextGroupSize--;
                    }else{
                        if(remainingEmployees % nextGroupSize === 0){
                            numberOfGroupsPerSize[nextGroupSize] = remainingEmployees / nextGroupSize;
                            remainingEmployees = 0;
                            break;
                        }else {
                            numberOfGroupsPerSize[nextGroupSize] = Math.floor(remainingEmployees / nextGroupSize);
                            remainingEmployees %= nextGroupSize;
                            currentGroupSize = nextGroupSize;
                        }
                    }
                }
                if(nextGroupSize < minGroupSize){
                    numberOfGroupsPerSize[remainingEmployees] = 1;
                    break;
                }
            }
        }

        let groups = [];
        let groupIndex = 0;

        for(let groupSize in numberOfGroupsPerSize){
            let numberOfGroups = numberOfGroupsPerSize[groupSize];
            for(let k = 1; k <= numberOfGroups; k++){
                for(let i = 1; i <= groupSize; i++){
                    let employee = employees.splice(Math.random() * employees.length, 1)[0];
                    if(groups[groupIndex]){
                        groups[groupIndex].push(employee)
                    }else{
                        groups[groupIndex] = [];
                        groups[groupIndex].push(employee)

                    }
                }
                groupIndex++;
            }

        }

        this.setState({
            groups
        })

    }

    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossOrigin="anonymous"/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" value={this.state.value} onChange={this.onChange.bind(this)}/>
                    <button type="submit">Add Employee</button>
                </form>
                <table>
                    <thead>
                    <tr>
                    {this.state.groups.map((group, key) =>{
                        return(
                            <th key={key}>
                                Group {key + 1}
                            </th>
                        )
                    })}
                    </tr>
                    </thead>
                    <tbody>
                            <tr>
                            {this.state.groups.map((group, key) =>{
                                return (
                                    <td style={{'verticalAlign': 'top'}} key={key}>
                                        {group.map((employee, key) =>{
                                        return (
                                            <div key={key}>
                                                {employee}
                                            </div>
                                        )
                                    })}
                                    </td>

                                )
                            })}
                            </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;


