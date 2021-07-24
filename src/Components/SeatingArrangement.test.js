import { shallow } from 'enzyme';
import SeatingArrangement from './SeatingArrangement';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai'

configure({ adapter: new Adapter() });

describe('Seating Methods Tests', () => {

    

    it('Should return seats array with Seat Type Names', () => {
        const wrapper = shallow(<SeatingArrangement />);
        expect(JSON.stringify(wrapper.instance().findSeatType([[3, 2], [4, 3]]))).equals(JSON.stringify([
            [['W', 'M', 'A'], ['W', 'M', 'A']],
            [
                ['A', 'M', 'M', 'W'],
                ['A', 'M', 'M', 'W'],
                ['A', 'M', 'M', 'W']
            ]
        ]));
    });

    it('Should return seats array with Filled seat numbers', () => {
        const seatingarray = [
            [['W', 'M', 'A'], ['W', 'M', 'A']],
            [
                ['A', 'M', 'M', 'W'],
                ['A', 'M', 'M', 'W'],
                ['A', 'M', 'M', 'W']
            ]
        ]
        const colSize = 3
        const rowSize = 4
        const wrapper = shallow(<SeatingArrangement />);
        expect(JSON.stringify(wrapper.instance().fillSeatingNumber("A", 1, seatingarray, colSize, rowSize, 13))).equals(JSON.stringify({
            seats: 
            [
                [['W', 'M', 'A-1'], ['W', 'M', 'A-3']],
                [
                    ['A-2', 'M', 'M', 'W'],
                    ['A-4', 'M', 'M', 'W'],
                    ['A-5', 'M', 'M', 'W']
                ]
            ],counter:6}));
    });


    it('Should return Final expected array', () => {
        const wrapper = shallow(<SeatingArrangement/>);
        expect(JSON.stringify(wrapper.instance().seatingSetup([[3, 2], [4, 3]],13))).equals(JSON.stringify([
            [['W-6', 'M-11', 'A-1'], ['W-8', 'M', 'A-3']],
            [
                ['A-2', 'M-12', 'M', 'W-7'],
                ['A-4', 'M', 'M', 'W-9'],
                ['A-5', 'M', 'M', 'W-10']
            ]
        ]));
    });
});