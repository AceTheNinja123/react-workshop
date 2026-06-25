/**
 * MondrianPainting component
 * 
 * Renders a grid-based layout styled after Piet Mondrian's abstract artwork.
 * The component creates a container with multiple colored and white divs arranged
 * in a geometric pattern inspired by Mondrian's characteristic style.
 * 
 * @component
 * @returns {JSX.Element} A div container with styled grid items representing a Mondrian painting
 * 
 * @example
 * return <MondrianPainting />
 */

function MondrianPainting() {
    return (
        <div className="container">
            <div className="item red"></div>
            <div className="item white1"></div>
            <div className="item white2"></div>
            <div className="item white3"></div>
            <div className="item blue"></div>
            <div className="item white4"></div>
            <div className="item"></div>
            <div className="item yellow"></div>
            <div className="item black"></div>
        </div>
    );
}
export default MondrianPainting;