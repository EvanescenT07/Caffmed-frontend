"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="mt-4 text-center font-semibold text-xl xl:text-3xl">
          About Caffmed
        </div>
        <div className="mt-4 text-center text-sm xl:text-base text-light-text/75 dark:text-dark-text/75">
          Caffmed is a web application that uses machine learning to detect
          brain tumors from MRI images.
        </div>
        <div className="flex flex-col w-full xl:max-w-[1175px] border border-light-tertiary/40 rounded-xl px-4 py-4 m-8">
          <p className="text-justify">
            It all started as a casual attempt to learn machine learning, so I
            began searching for interesting and challenging datasets to try out.
            Eventually, I came across a dataset about brain tumors, which seemed
            like a great fit for a small project. This dataset presented an
            opportunity to develop a machine learning model that could predict
            or classify the available data. From there, I began experimenting
            with various techniques and algorithms to see how well machine
            learning could work with this dataset. What started as a simple
            trial-and-error process gradually turned into an enjoyable learning
            experience, sparking many ideas for further exploration in
            technology and data.
          </p>
          <p className="text-justify mt-4">
            While the model achieves great accuracy, there are rare cases of
            misprediction on certain images, likely due to the random nature or
            differing contexts of the data. Despite this, the overall
            performance remains impressive and reliable.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/assets/dark.jpeg"
                  : "/assets/light.jpeg"
              }
              width={1250}
              height={750}
              alt="Example of Detection"
              className="rounded object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
