import style from "./Home.module.scss";
import schoolImage from "../../assets/school.jpg";

const Home = () => {
  return (
    <div className={style["home-wrapper"]}>
      <img src={schoolImage} alt="school classroom" />
      <div className={style["panel-wrapper"]}>
        <div className={style.panel}>
          <h2>Create lessons plan </h2>
          <h2>for your school</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
