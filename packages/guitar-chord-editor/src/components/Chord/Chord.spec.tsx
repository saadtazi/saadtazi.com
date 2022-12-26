import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chord } from './Chord';

describe('<Chord />', () => {
  describe('when non-editable', () => {
    beforeEach(() => {
      render(<Chord nbStrings={4} nbFrets={5} position={3} />);
    });

    it('renders the right amount of open string elements', () => {
      expect(screen.getAllByLabelText('open-string')).toHaveLength(4);
    });

    it('renders the right amount of chords', () => {
      expect(screen.getAllByLabelText('string')).toHaveLength(4);
    });

    it('renders the right amount of frets', () => {
      expect(screen.getAllByLabelText('fret-line')).toHaveLength(5 + 1);
    });
  });
  describe('when position is `1`', () => {
    beforeEach(() => {
      render(<Chord nbStrings={4} nbFrets={4} position={1} />);
    });

    it('renders an extra line for the first fret', () => {
      expect(screen.getAllByLabelText('first-fret-line')).toHaveLength(1);
    });

    it('does not render the position as text', () => {
      expect(screen.queryAllByLabelText('position')).toHaveLength(0);
    });
  });

  describe('when position is higher than `1`', () => {
    beforeEach(() => {
      render(<Chord nbStrings={4} nbFrets={4} position={2} />);
    });

    it('renders the position as text', () => {
      expect(screen.queryByLabelText('position')).toHaveTextContent('2');
    });
  });

  describe('when editable', () => {
    let onChange: jest.Mock;

    beforeEach(() => {
      onChange = jest.fn();
      render(
        <Chord
          nbStrings={4}
          nbFrets={4}
          position={0}
          editable={true}
          onChange={onChange}
          selected={[undefined, 0, 2, undefined]}
        />
      );
    });

    describe('when an openString element that was not selected is clicked', () => {
      beforeEach(async () => {
        // click the first one
        const openStringEls = screen.getAllByLabelText('open-string');
        await userEvent.click(openStringEls[0]);
      });

      it('calls onChange with the modified position (open)', () => {
        expect(onChange).toBeCalledWith([0, 0, 2, undefined]);
      });
    });

    describe('when an openString element that was selected with 0 is clicked', () => {
      beforeEach(async () => {
        // click the first one
        const openStringEls = screen.getAllByLabelText('open-string');
        await userEvent.click(openStringEls[1]);
      });

      it('calls onChange with the modified position (unselected)', () => {
        expect(onChange).toBeCalledWith([undefined, undefined, 2, undefined]);
      });
    });

    describe('when an openString element that was selected with a finger is clicked', () => {
      beforeEach(async () => {
        // click the first one
        const openStringEls = screen.getAllByLabelText('open-string');
        await userEvent.click(openStringEls[2]);
      });

      it('calls onChange with the modified position (open)', () => {
        expect(onChange).toBeCalledWith([undefined, 0, 0, undefined]);
      });
    });

    // TODO: add clicks on frets
  });
});
