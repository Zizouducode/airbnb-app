import { Entypo } from "@expo/vector-icons";

const generateStars = (ratingValue) => {
  const starsArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      starsArray.push(<Entypo name="star" size={24} color="#FFB100" key={i} />);
    } else {
      starsArray.push(<Entypo name="star" size={24} color="#BBBBBB" key={i} />);
    }
  }

  return starsArray;
};

export default generateStars;
