import React from "react";
import "../components/Login.css";

const HealthDec = () => {
  return (
    <div className="healthDec">
      <h1>Who can/cannot donate blood</h1>
      <p>
        1. Make sure that 3 months have passed since the last blood donation.{" "}
        <div className="space">
          2. If there was a very severe reaction in previous blood donations,
          such as loss of consciousness or convulsions, it is recommended not to
          donate blood.{" "}
        </div>
        <div className="space">3. The weight should be over 50 kg. </div>
        <div className="space">
          4. When testing blood pressure, make sure that the values do not
          exceed 180/100 and are not below 100/60 mm Hg.{" "}
        </div>
        <div className="space">
          5. There is no prohibition to donate blood during the menstrual cycle.{" "}
        </div>
        <div className="space">6. Pregnant - don't donate blood. </div>
        <div className="space">
          7. Birth - you can donate half a year after birth.{" "}
        </div>
        <div className="space">
          8. Don't donate blood 12 hours before flying/diving/adventure
          sports/or engaging in professions that require increased concentration
          (such as public transportation drivers on shift, work at height, etc.){" "}
        </div>
        <div className="space">
          9. During an acute illness - don't donate blood.{" "}
        </div>
        <div className="space">
          10. Treatment with antibiotics - it is allowed to donate after the end
          of the treatment and full recovery according to the disease.{" "}
        </div>
        <div className="space">
          11. Dental treatments - you can donate 24 hours after treatment at a
          dentist, 7 days after a root canal / tooth extraction and a month
          after a dental implant.{" "}
        </div>
        <div className="space">
          12. A person with hyperlipidemia treated with β (beta) blockers can
          only donate if the heart rate is equal to or above 70 per minute.
        </div>
        <div className="space">
          13. A person suffering from a cardiac problem or heart rhythm
          disorders that require drug treatment cannot donate blood (with the
          exception of prolapse of the mitral valve and congenital defects that
          have been corrected).{" "}
        </div>
        <div className="space">
          14. People who have suffered from epilepsy can donate blood if they do
          not receive drug treatment and at least 5 years have passed since the
          last attack.{" "}
        </div>
        <div className="space">
          15. Hepatitis (jaundice):{" "}
          <div className="space">
            - A person who suffered from hepatitis/jaundice for an unknown
            reason - can donate two years after recovery.{" "}
          </div>{" "}
          <div className="space">
            - A person who suffered from type A viral hepatitis - can donate a
            year after recovery.{" "}
          </div>
          <div className="space">
            - A person who suffered from viral hepatitis type B or C - do not
            donate.{" "}
          </div>
        </div>
        <div className="space">
          16. Exposure due to contact with a patient with hepatitis - must be
          checked with a medical authority at the blood services.{" "}
        </div>
        <div className="space">
          17. In the case of giving a preventive vaccine against:{" "}
          <div className="space">
            - Type B hepatitis (not following exposure to the patient), you must
            wait a week.{" "}
          </div>{" "}
          <div className="space">
            - Vaccinations against influenza, tetanus, meningitis - you can
            donate immediately after the vaccination (provided the donor does
            not have symptoms).
          </div>{" "}
          <div className="space">
            - Vaccination for rubella/measles/chicken pox/yellow fever you have
            to wait 4 weeks.{" "}
          </div>
        </div>
        <div className="space">
          18. Asthma - it is possible to donate if the donor feels well, did not
          have an attack for at least the week before the donation, and does not
          take steroid pills{" "}
        </div>
        <div className="space">
          19. Tuberculosis and brucellosis - you can donate two years after full
          recovery.{" "}
        </div>
        <div className="space">
          20. Diabetes - it is possible to donate if diabetes is balanced by
          diet or medication (not including insulin). Diabetics treated with
          insulin are not allowed to donate blood.{" "}
        </div>
        <div className="space">
          21. Malignant diseases - a disease or a history of a hematological or
          virus-induced malignant disease (leukemia, lymphoma, Hodgkin's
          disease) - do not donate blood.{" "}
          <div className="space">
            Local tumors without metastatic potential (BCC or cervical polyp)
            will be accepted after removal of the lesion and full recovery.
            Other tumors: at least 5 years after completion of treatment and
            full recovery.{" "}
          </div>{" "}
        </div>
        <div className="space">
          22. Stomach ulcer - you can donate if the ulcer is not bleeding, and
          the hemoglobin level is normal.{" "}
        </div>
        <div className="space">
          23. Anemia or tendency to bleed - don't donate blood.{" "}
        </div>
        <div className="space">
          24. Chronic illness - must be checked with the medical authority at
          the blood services.{" "}
        </div>
        <div className="space">
          25. Medicines - according to the procedures of the blood services.{" "}
        </div>
        <div className="space">
          26. Receiving a blood transfusion/blood components - you can donate 4
          months after receiving the transfusion.{" "}
        </div>
        <div className="space">
          27. Getting a tattoo, piercing, permanent makeup, endoscopy with
          biopsy - you can donate if 4 months have passed.{" "}
        </div>
        <div className="space">
          28. Visits to countries endemic for malaria - it is possible to donate
          one year after leaving the endemic area.{" "}
        </div>
        <div className="space">
          29. Residence/stay for more than 6 months in a country where malaria
          is common or malaria morbidity - you can donate blood if 3 years have
          passed since leaving the endemic area/recovering from malaria.{" "}
        </div>
        <div className="space">
          30. Visiting/staying or living in countries with a high incidence of
          AIDS (over 1% of the population, according to the definition of the
          World Health Organization) -{" "}
          <div className="space">
            anyone who has visited or stayed for more than a year in an endemic
            country can be exempted if 3 months have passed since he left the
            endemic area.{" "}
          </div>{" "}
        </div>
        <div className="space">
          31. Having sex with a high risk of contracting diseases that can be
          transmitted by transfusion (anal intercourse and/or under the
          influence of drugs) with a new partner or multiple partners:{" "}
        </div>
        <div className="space">
          31.1 Blood can be donated, if 3 months have passed since the last
          sexual intercourse.{" "}
        </div>
        <div className="space">
          31.2 Those who have high-risk sexual relations as detailed above can
          donate blood even before 3 months have passed since the intercourse,{" "}
          <div className="space">
            as part of the frozen plasma program where the portion of plasma
            will be frozen and preserved.{" "}
          </div>{" "}
          <div className="space">
            If blood is donated again at the end of 3 months, and the results of
            all the tests to identify diseases that can be transfused are
            negative, the portion of the frozen plasma will be provided to treat
            the patients.{" "}
          </div>
        </div>
        <div className="space">
          32. Situations in which it is impossible to use the dose for infusion:{" "}
        </div>
        <div className="space">
          32.1. The donor received treatment with growth hormone of human
          origin, or underwent a transplant of medullary membranes or cornea,
          from human origin.{" "}
        </div>
        <div className="space">
          32.2. In the close family (up to a second relation) the donor has a
          neurological disease called: "Creutzfeldt - Jacob", or it is said that
          there is a risk of this disease in his family.{" "}
        </div>
        <div className="space">
          32.3. The donor maintains a lifestyle that may increase the risk to
          the blood recipients such as intravenous drug use/dealing, having sex
          for payment.{" "}
        </div>
        <div className="space">
          33. Those who have sexual relations with persons who in sections 30,
          31, 32.4 can be suspended - if 3 months have passed since the last
          sexual contact.{" "}
        </div>
        <div className="space">
          34. Tropical viruses (such as Zika, dengue, chikungunya){" "}
        </div>
        <div className="space">
          34.1. It is allowed to donate 4 months after recovering from an
          illness.{" "}
        </div>
        <div className="space">
          34.2. It is allowed to donate 4 weeks after leaving a country endemic
          for tropical viruses. The endemic areas for tropical viruses are
          listed at www.cdc.gov{" "}
        </div>
        <div className="space">
          34.3. For a woman: it is allowed to donate 4 weeks after having
          intercourse with a man who stayed in an endemic area for Zika and that
          3 months have not passed since he left the endemic area.{" "}
          <div className="space">
            For reasons of convenience only, the document is written in the
            masculine language.{" "}
          </div>
        </div>
      </p>
    </div>
  );
};

export default HealthDec;
