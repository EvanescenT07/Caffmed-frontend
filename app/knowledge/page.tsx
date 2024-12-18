import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const KnowledgePage = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="mt-4 text-center font-semibold text-xl xl:text-3xl">
          Knowledge About Brain Tumor
        </div>
        <div className="mt-4 text-center text-sm xl:text-base text-light-text/75 dark:text-dark-text/75">
          Get to know more about brain tumor, its types, symptoms, and treatment
          options.
        </div>
        <div className="w-screen px-4 xl:w-[750px] flex flex-col mt-4 text-justify">
          {/* Accordion 1 */}
          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="1">
              <AccordionTrigger>Brain Tumor</AccordionTrigger>
              <AccordionContent>
                <p>
                  A brain tumor is a growth of abnormal cells in the brain or
                  near the brain. These tumors can develop in many parts of the
                  brain, including the brainstem, the sinuses, the skull base,
                  and the protective lining.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Accordion 2 */}
            <AccordionItem value="2">
              <AccordionTrigger>Types of Brain Tumor</AccordionTrigger>
              <AccordionContent>
                <p>
                  A brain tumor have many types, some of them are : Glioma,
                  Meningioma, and Pituitary tumors.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Accordion 3 Glioma*/}
            <AccordionItem value="Glioma">
              <AccordionTrigger>Glioma Brain Tumor</AccordionTrigger>
              <AccordionContent>
                <p>
                  Glioma is a type of brain tumor that originates from glial
                  cells, which support the nervous system. The exact cause of
                  glioma is unknown, but genetic factors, family history, and
                  radiation exposure can increase the risk. Symptoms of glioma
                  include worsening headaches, seizures, nausea, vomiting,
                  vision problems, and body weakness. Treatment typically
                  involves a combination of surgical tumor removal, radiation
                  therapy, and chemotherapy, depending on the tumor&apos;s size,
                  location, and severity.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Accordion 4 Meningioma */}
            <AccordionItem value="Meningioma">
              <AccordionTrigger>Meningioma Brain Tumor</AccordionTrigger>
              <AccordionContent>
                <p>
                  Meningioma is a benign tumor that grows in the meninges, the
                  protective membranes covering the brain and spinal cord. Its
                  cause is not fully understood, but risk factors such as
                  radiation exposure, hormones, and genetic mutations may
                  contribute to tumor growth. Symptoms of meningioma develop
                  gradually and include headaches, vision problems, seizures,
                  and body weakness. Treatment options include regular
                  monitoring for small tumors, surgery to remove the tumor, and
                  radiation therapy if surgery is not possible.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Accordion 5 Pituitary */}
            <AccordionItem value="Pituitary">
              <AccordionTrigger>Pituitary Brain Tumor</AccordionTrigger>
              <AccordionContent>
                <p>
                  Pituitary adenoma is a benign tumor that grows in the
                  pituitary gland, which controls hormone production in the
                  body. While the exact cause is unknown, genetic mutations and
                  hormonal factors are believed to play a role. Symptoms vary
                  depending on the tumor size and affected hormones, such as
                  vision problems, headaches, fatigue, or hormonal disorders
                  like gigantism or Cushing&apos;s syndrome. Treatment includes
                  medication to regulate hormones, surgery to remove the tumor,
                  and radiation therapy when necessary.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Treatment */}
            <AccordionItem value="Treatment">
              <AccordionTrigger>Brain Tumor Treatment</AccordionTrigger>
              <AccordionContent>
                <ul className="px-4 list-disc list-inside space-y-5">
                  <li>
                    <span className="font-bold">Surgery :</span> Effective for
                    tumor removal, especially for accessible tumors.
                  </li>
                  <li>
                    <span className="font-bold">Radiation Therapy :</span> Often
                    used post-surgery or when the tumor cannot be surgically
                    removed.
                  </li>
                  <li>
                    <span className="font-bold">Chemotherapy :</span> Utilized
                    to target cancerous cells, often alongside other treatments.
                  </li>
                  <li>
                    <span className="font-bold">Targeted Therapy :</span> A
                    newer approach focusing on specific tumor characteristics.
                  </li>
                  <li>
                    <span className="font-bold">Immunotherapy :</span> Boosting
                    the body&apos;s immune system to fight the tumor.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage;
