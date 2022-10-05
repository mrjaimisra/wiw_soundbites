// import { h3SoundBites } from './H3.js';
import Bite from './Bite.js';

const H3Bites = props => {
  const searchTerms = props.search.toLowerCase().split(" ").filter(a => a.length > 0);

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

  function dataToSearch(data) {
    return [data.speaker.toLowerCase()].concat(
      data.name.split(" ").map(d => d.toLowerCase())
    );
  }

  function speakerNameMatchesSearchTerms(name) {
    let nameMatches = searchTerms.every(st => name.toLowerCase().includes(st));
    if (nameMatches) return true;

    return false;
  }

  function foundMatch(matchData) {
    if (speakerNameMatchesSearchTerms(matchData[0])) return true;
    return biteNameMatchesSearchTerms(matchData);
  };

  function biteNameMatchesSearchTerms(matchData) {
    var lastFoundIndex;

    return searchTerms.every((term) => {
      return matchData.some((segment) => {
        if (segment.includes(term)) {
          if (lastFoundIndex && matchData.slice(lastFoundIndex).indexOf(segment) === -1) return false;

          lastFoundIndex = matchData.indexOf(segment);
          matchData[lastFoundIndex] = segment.replace(term, "");
          return true;
        }
        return false;
      });
    });
  }

  Array.prototype.groupBySpeakerFilterAndSort = function() {
    return(
      Object.entries(groupBy(this, "speaker"))
      .filter(([name, data]) => data.some(d => foundMatch(dataToSearch(d))))
      .sort((a, b) => compareAttributes(a, b, 0))
    );
  }

  return props.bites.groupBySpeakerFilterAndSort().map(([groupName, bitesData]) => {
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
          <BitesHeader
            imgSrc={bitesData[0].imgSrc}
            groupName={groupName}
          />

          <BitesSection
            bitesData={bitesData}
            dataToSearch={dataToSearch}
            foundMatch={foundMatch}
            compareAttributes={compareAttributes}
          />
        </div>
      )
    });
}

export default H3Bites;

const BitesHeader = props => {
  const heading = <h2 style={{width: 'fit-content'}}>{props.groupName}</h2>;
  const image = <img src={props.imgSrc} style={{width: '10vw', height: 'auto'}} alt={props.groupName}/>;

  return(
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
  )
}

const BitesSection = props => {
  function renderBitesInSection() {
    return props.bitesData.filter((data) => props.foundMatch(props.dataToSearch(data)))
      .sort((a, b) => props.compareAttributes(a, b, "name"))
      .map((bite, i) => {
        return (
        <Bite
          key={i}
          id={'bite-' + i}
          name={bite.name}
          src={bite.src}
          speaker={bite.speaker}
        />
      );
    });
  }

  return(
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "2vw",
      }}
    >
      {renderBitesInSection()}
    </section>
  )
}
