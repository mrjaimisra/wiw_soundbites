import { h3SoundBites } from './H3.js';
import Bite from './Bite.js';

const H3Bites = props => {
  function groupBy(objects, attribute) {
    return objects.reduce(function(group, object) {
      (group[object[attribute]] = group[object[attribute]] || []).push(object);
      return group;
    }, {});
  }

  function compareAttributes(a, b, attribute) {
    if ( a[attribute] < b[attribute] ){
      return -1;
    }
    if ( a[attribute] > b[attribute] ){
      return 1;
    }
    return 0;
  }

  return Object.entries(groupBy(h3SoundBites(), "speaker"))
    .sort((a, b) => compareAttributes(a, b, 0))
    .map(([groupName, bitesData]) => {
      const heading = <h2 style={{width: 'fit-content'}}>{groupName}</h2>;
      const image = <img src={bitesData[0].imgSrc} style={{width: '10vw', height: 'auto'}}/>;

      const header = (
        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
          }}
        >
          {heading}
          {image}
        </div>
      );

      const bites = bitesData.sort((a, b) => compareAttributes(a, b, "name")).map((bite, i) => {
        return (
          <Bite
            key={i}
            name={bite.name}
            src={bite.src}
            speaker={bite.speaker}
          />
        );
      });

      const bitesSection = (
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "2vw",
          }}
        >
          {bites}
        </section>
      )

      return(
        <div
          key={groupName}
          style={{
            display: "flex",
            marginBottom: "1.5vw",
            marginTop: "1vw",
            padding: "0.5vw"
          }}
        >
          {header}
          {bitesSection}
        </div>
      )
    });
}

export default H3Bites;
