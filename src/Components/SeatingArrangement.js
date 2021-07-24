import React, { Component } from 'react'
import './Seating.css'

export default class SeatingArrangement extends Component {

    state={seatingSetup:[],inputarray:[],count:0}


    seatingSetup(array,seatnumber){
        let rowSize = Math.max.apply(Math, array.map(e => e[0]));
        let colSize = Math.max.apply(Math, array.map(e => e[1]));

        let seatingarray = this.findSeatType(array);


        let tempSeatObject = {};
        tempSeatObject = this.fillSeatingNumber("A", 1, seatingarray, colSize, rowSize, seatnumber);


        tempSeatObject = this.fillSeatingNumber("W", tempSeatObject.counter, tempSeatObject.seats, colSize, rowSize, seatnumber);


        tempSeatObject = this.fillSeatingNumber("M", tempSeatObject.counter, tempSeatObject.seats, colSize, rowSize, seatnumber);
        seatingarray = tempSeatObject.seats;
        this.setState({ seatingSetup: tempSeatObject.seats})
    }

    findSeatType(array){
        let seats = [];
        for (let i = 0; i < array.length; i++) {
            seats.push(Array(array[i][1]).fill().map(() => Array(array[i][0]).fill("M")));
        }

        for (let i = 0; i < seats.length; i++) {
            for (let j = 0; j < seats[i].length; j++) {
                seats[i][j][0] = "A";
                seats[i][j][seats[i][j].length - 1] = "A";
            }
        }
        for (let i = 0; i < seats[0].length; i++)
            seats[0][i][0] = "W";
        for (let i = 0; i < seats[seats.length - 1].length; i++)
            seats[seats.length - 1][i][(seats[seats.length - 1][i].length) - 1] = "W";

        return seats;
    }

    fillSeatingNumber(val, counter, seats, colSize, rowSize, seatnumber) {
        for (let i = 0; i < colSize; i++) {
            for (let j = 0; j < rowSize; j++) {
                if (seats[j] == null || seats[j][i] == null)
                    continue;
                for (let k = 0; k < seats[j][i].length; k++) {
                    if (seats[j][i][k] === val && counter < seatnumber) {
                        seats[j][i][k] += '-' + counter;
                        counter++;
                    }
                }
            }

        }
        return { seats: seats, counter: counter };
    }

    setupBlocks(array){
      return array.map((item, i) => {
            return (
                <div className="SeatingBlocks">
                    {this.setupRows(item)}
                </div>
            );
        })
    }

    setupRows(array){
        return array.map((item, i) => {
            return (
                <div className="seatingRows">
                    {this.setupIndividualSeats(item)}
                </div>
            );
        })
    }

    setupIndividualSeats(array){
        return array.map((item, i) => {
 
                
            return <>{this.renderColours(item)}</>
             

        })
    }

    renderColours(item){
        if (item.split("-")[0] === 'W'){
            return (<div className="blocksGreen">
                {item.split("-").length === 2 ? item.split("-")[1] : null}
            </div>
      )
        } else if (item.split("-")[0] === 'A'){
            return (<div className="blocksBlue">
                {item.split("-").length === 2 ? item.split("-")[1] : null}
            </div>
            )} else if (item.split("-")[0] === 'M') {
            return (<div className="blocksRed">
                {item.split("-").length === 2 ? item.split("-")[1] : null}
            </div>
            )}
     
    }

    render() {
        return (
            <div>
               <div className="header">
                   Airplane Seating Arrangement Setup 
                </div>
                <div>
                    <div>Please Enter Seating Setup Array</div>
                    <input className="seatingArrayInput" onChange={(e)=> this.setState({inputarray: e.target.value})}></input>
                </div>
                <div>
                    <div>Please Enter Seats Filling Number</div>
                    <input className="seatingNumberInput" onChange={(e) => this.setState({ count: parseInt(e.target.value)+1 })}></input>
                </div>
                <div>
                    <button className="seatingNumberButton" onClick={() => this.seatingSetup(JSON.parse(this.state.inputarray),this.state.count)}>Compute</button>
                </div>

                <div className="seatingBlocks">
                    {this.state.seatingSetup.length > 0 && this.setupBlocks(this.state.seatingSetup)}
                </div>
            </div>
        )
    }
}
