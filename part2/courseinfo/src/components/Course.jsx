const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>Number of exercises {sum}</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  const parts = [...course.parts];
  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </div>
  );
};

export default Course;
