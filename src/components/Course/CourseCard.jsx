import AppUserCard from "../AppUser/AppUserCard.jsx";

const CourseCard = ({course}) => {

    return (
        <>
            <div>
                <h2>{course.name}</h2>
                <p>{course.credits}</p>
                <h2>Teacher:</h2>
                {
                    course.teacher && (
                        <AppUserCard
                            key={course.teacher.id}
                            appUser={course.teacher}
                        />
                    )
                }
                <h2>Students:</h2>
                {
                    course.students?.map(student => (
                        <AppUserCard
                            key={student.id}
                            appUser={student}
                        />
                    ))
                }
            </div>
        </>
    )

}

export default CourseCard;