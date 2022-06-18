import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getLessonsHoursAndProgram } from "../../store/schedule-slice";

import style from "./SchedulePreview.module.scss";
import { getDayName, getHours } from "./creators/ScheduleCreator";
import LessonPreviewCard from "../../components/lesson-preview-card/LessonPreviewCard";

const SchedulePreview = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const lessonsHours = useSelector((state) => state.schedule.lessonsHours);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);

	useEffect(() => {
		dispatch(
			getLessonsHoursAndProgram({
				school_class: { value: location.state.school_class },
				isCreator: 2,
			}),
		);

    axios
      .get(
        `http://127.0.0.1:8000/api/lesson_plans/${location.state.school_class.ID_Class}/`
      )
      .then((response) => setSchedule(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/subjects_with_colors/")
      .then((response) => setColors(response.data));
  }, [
    location.state.school_class.ID_Class,
    dispatch,
    location.state.school_class,
  ]);

  const getSubjectColor = (subject) => {
    return colors.find((element) => element.ID_Subject === subject.ID_Subject)
      .Color;
  };

	return (
		<div className={style['wrapper']}>
			<div className={style['panel-wrapper']}>
				<h1>{`${location.state.school_class.Class_no} - ${location.state.school_class.Year}`}</h1>
				<div className={style['plan-wrapper']}>
					{schedule.length > 0 &&
						colors.length > 0 &&
						lessonsHours.length > 0 &&
						schedule.map((column, column_index) => {
							return (
								<div key={column_index}>
									<p className={style['day-name']}>{getDayName(column_index)}</p>
									{schedule[column_index].map((lesson, row_index) => {
										return (
											<div key={`${column_index}${row_index}}`}>
												{column_index === 0 ? (
													<div className={style['window-with-wrapper']}>
														<p className={style['lesson-hours']}>
															{getHours(
																lessonsHours[row_index].Start_hour,
																lessonsHours[row_index].Start_minute,
																lessonsHours[row_index].End_hour,
																lessonsHours[row_index].End_minute,
															)}
														</p>
														<div className={style['empty-lesson']}>
															{Object.keys(lesson).length !== 0 && (
																<LessonPreviewCard
																	lesson={lesson}
																	color={getSubjectColor(lesson.subject)}
																/>
															)}
														</div>
													</div>
												) : (
													<div className={style['empty-lesson']}>
														{Object.keys(lesson).length !== 0 && (
															<LessonPreviewCard
																lesson={lesson}
																color={getSubjectColor(lesson.subject)}
															/>
														)}
													</div>
												)}
											</div>
										);
									})}
								</div>
							);
						})}
				</div>
			</div>
			<button onClick={() => navigate('/schedules')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default SchedulePreview;
