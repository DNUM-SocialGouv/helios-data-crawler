export const ListeDesIssues = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>titre</th>
          <th>label</th>
          <th>état</th>
          <th>type</th>
          <th>epic</th>
        </tr>
      </thead>
      <tbody>
        {/* {stories.map((story, index) => (
          <tr key={index}>
            <th>{story.titre}</th>
            <th>{story.label}</th>
            <th>{story.état}</th>
            <th>{story.type}</th>
            <th>{story.epic}</th>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};
