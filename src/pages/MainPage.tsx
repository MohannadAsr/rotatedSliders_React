import AutoSlider from '@components/AutoSlider';
import SingleSlide from '@components/SingleSlide';
import { useApi } from '@src/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
const DaysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export class ScreenDto {
  created_at: string = '';
  files: ScreenFileDto[] = [];
  id: number = 5;
  name: string = '';
  restaurant_id: number = 1;
  updated_at: string = '';
}

export class ScreenFileDto {
  files_images: { img: string; id: number }[] = [];
  id: number = 22;
  position: number = 1;
  screen_id: number = 4;
  time: number = 120;
}

const { GET } = useApi();
// GET Screens
const getByIdFn = async (id: string) => {
  const response = await GET<ScreenDto>(
    '/screen/get/{{id}}'.replace('{{id}}', id)
  );
  return response.data;
};

function MainPage() {
  const todayDate = new Date().getDay();
  const dayName = DaysOfTheWeek[todayDate];
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['ScreenById', id],
    queryFn: () => getByIdFn(id),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const sliders = React.useMemo(() => {
    if (!data) return [];
    const infitieSlider = data.files.find((item) => !item.time);
    if (infitieSlider)
      return [
        { url: infitieSlider.files_images[0].img, time: infitieSlider.time },
      ];
    else
      return data.files.map((item) => ({
        time: item.time,
        url: item.files_images[0].img,
      }));
  }, [data]);

  return (
    <div className=" h-[100dvh] w-full overflow-hidden relative flex items-center justify-center">
      {sliders?.length !== 0 && sliders?.length > 1 ? (
        <AutoSlider List={sliders} />
      ) : (
        <>{sliders[0] && <SingleSlide item={sliders[0]} />}</>
      )}
    </div>
  );
}

export default MainPage;
