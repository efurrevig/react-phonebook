import Part from './Part'
import Header from './CourseHeader'
import Info from './Info'

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header courseName={course.name} />
            {course.parts.map((course) => (
                <Part key={course.id} name={course.name} exercise={course.exercises} />
            ))}
            <Info total={total} />
        </div>
    )
}

export default Course