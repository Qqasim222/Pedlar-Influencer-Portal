import * as Colors from "../../../assets/styles/Colors";
import {
  Heading1B,
  Heading6S,
  LabelWrapper,
} from "../../../assets/styles/Labels";
import "./TermsConditions.scss";
import headerLogo from "../../../assets/images/logo/header-logo.svg";

const strings = require("../../../localisation_en.json");

function TermsConditions(props) {

  return (
    <>
      <div className="static-main-view grin-texture-img">
        <div className="container-static">
          <img src={headerLogo} className="header-logo" alt="" />
          <div className="term-condition-main">
            <div className="tcm-text-view">
              <Heading1B
                text={strings.creatorTermsAndConditions}
                color={Colors.black1c}
                fontWeight={"700"}
                className="font-size-64"
                padding={"60px 0 60px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "These are the Terms and Conditions referred to in the Pedlar Store Pty Ltd (ACN 655 606 250) (Pedlar) Platform."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You agree that by using the Pedlar Platform and/or by pressing ‘Yes’/’I accept/Submit‘, these Terms and Conditions will be the Agreement governing the relationship between you and Pedlar and you agree to be bound by these Terms and Conditions."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"1. Definitions and Interpretation"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"1.1 Definitions"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={
                  "The following terms in these Terms and Conditions have the meanings set out below, unless otherwise indicated:"
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Agreement"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means the agreement comprising:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"these Terms and Conditions"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Confidential Information"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means all information disclosed (including inadvertently) by a party (Discloser) in connection"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "with the Agreement, all information disclosed by a third party that the Discloser is required to keep confidential, including (without limitation):"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "information which, either orally or in writing, is designated or indicated as being the proprietary or confidential"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "information of the Discloser or a third party to whom the Discloser owes an obligation of confidentiality;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(b)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Information derived partly or wholly from the information, including (without limitation) any calculation,"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"conclusion, summary, computer modelling; and"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(c)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "trade secrets or information that is capable of protection at law or equity as confidential information, and the parties"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "agree that the terms of the Agreement are jointly owned Confidential Information;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Force Majeure Event"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means any of the following causes provided that they are outside the reasonable control of the affected"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "party and could not have been prevented or avoided by that party taking all reasonable steps:"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "act of God, earthquake, cyclone, fire, explosion, flood, landslide, lightning, storm, tempest, drought or meteor;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(b)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "war (declared or undeclared), invasion, act of a foreign enemy, hostilities between nations, civil insurrection or"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"militarily usurped power;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(c)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "act of public enemy, sabotage or malicious damage, terrorism or civil unrest;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(d)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "ionising radiation or contamination by radioactivity from any nuclear waste or from combustion of nuclear fuel;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(e)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "confiscation, nationalisation, requisition, expropriation, prohibition, embargo, restraint or damage to property by or"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "under the order of any government or government authority (except where such arises out of a failure by a party to comply with any Law);"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(f)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"health crisis or pandemic or any nature; or"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(g)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "strikes, blockades, lock out or other industrial disputes other than an industrial dispute that only involves the party’s personnel."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(4)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"GST"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means Goods and Services Tax as defined in the A New Tax System (Goods and Services Tax) Act 1999 (Cth);"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(5)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Information"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"has the meaning given to that term in cl 8.1;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(6)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Instagram"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means the Instagram application;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(7)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"IPR"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"or"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={" Intellectual Property Rights"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means all patents, rights to inventions, utility models, copyright and related rights, trade marks,"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "service marks, trade, business and domain names, rights in trade dress or get-up, rights in goodwill or to sue for passing off, unfair competition rights, design rights, rights in computer software, database rights, topography rights, rights in confidential information (including know-how and trade secrets) and any other intellectual property rights of any kind whether registrable or not in any country, including any renewals or extensions thereof;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(8)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Jurisdiction"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means any of the following:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "the State of New South Wales and the Commonwealth of Australia – if your residential address is anywhere else in the world."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(9)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Law"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means any applicable statute, regulation, by-law, ordinance or subordinate legislation in force from time to time"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"in the Jurisdiction applicable to the Agreement;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(10)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Materials"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means material in any form, including drawings, reports, specifications, images, photos, videos and media"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "in Graphics Interchange Format and other proprietary media types (howsoever constituted) and other documents provided by you in connection with the Agreement; "
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(11)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Payment"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"has the meaning given to that term in clause 5.1;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(12)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Pedlar Store"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means any storefront on the Pedlar Platform;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(13)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Privacy Policy"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means Pedlar’s Privacy Policy available at"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"http://pedlar.store/"}
                  color={"#6750A4"}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                  textDecoration={"underline"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"privacy policy;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(14)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Schedule"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means the Schedule to this document;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(15)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Taxes"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "means GST, VAT or any sales tax that may apply in the Jurisdiction to the provision of the Agreement;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(16)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Terms and Conditions"}
                  color={Colors.black1c}
                  fontWeight={"600"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"means this document;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"1.2 Interpretation"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"10px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"In the Agreement:"}
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"reference to:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"one gender includes the others;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(b)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "the singular includes the plural and the plural includes the singular;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(c)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"a person includes a body corporate;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(d)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "a party includes the party’s executors, administrators, successors and permitted assigns;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(e)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "a thing includes the whole and each part of it separately;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(f)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "a statute, regulation, code or other law or a provision of any of them includes:"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(i)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"any amendment or replacement of it; and"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(ii)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "another regulation or other statutory instrument made under it, or made under it as amended or replaced; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(g)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "dollars means Australian dollars unless otherwise stated in the Quote."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "“Including” and similar expressions are not words of limitation."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Where a word or expression is given a particular meaning, other parts of speech and grammatical forms of that word"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"or expression have a corresponding meaning."}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(4)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Headings and any table of contents or index are for convenience only and do not form part of this Agreement"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"or affect its interpretation."}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 20px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(5)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "A provision of this Agreement must not be construed to the disadvantage of a party merely because that party was"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "responsible for the preparation of the Agreement or the inclusion of the provision in the Agreement."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>

              <Heading6S
                className="tc-head6"
                text={"2. Application of these Terms and Conditions"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "These Terms and Conditions apply to any Pedlar Store for the provision of services offered by Pedlar to you through"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"through the Pedlar Platform."}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Pedlar may, at any time, and at its sole discretion, modify these Terms and Conditions."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "If you use the Pedlar Platform, will provide notice to you of these modifications "
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 20px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(4)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Your use of the Pedlar Platform following any modification to the Terms and Conditions will be subject to the most current"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"current version of the Terms and Conditions."}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>

              <Heading6S
                className="tc-head6"
                text={"3. Payment"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"3.1 Payment"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You will be paid up to 20% commission on the total sale price items sold on your Pedlar Store."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"3.2 Payment Method"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "All payments made by Pedlar to you will be to your nominated bank account or Paypal account using the details provided by you when registering for the Pedlar Platform or such other payment method allowable and nominated by Pedlar. It is your responsibility to ensure that these details have been provided and are correct. Pedlar does not bear any responsibility for payments made to an incorrect bank details or Paypal account or other account."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"3.3 Taxes"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Pedlar will pay an additional amount for Taxes if this is applicable to you in the relevant Jurisdiction. Pedlar may also, from time to time, deduct withholding tax or any similar type of tax from amounts payable under cl 4.1 if required by any Law."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"3.4 Time for Payment"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You will be paid 30 days after the sale is made subject to you not being in breach of this Agreement. "
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"4. Materials and Intellectual Property Rights (IPR)"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"4.1 Property in Posts"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "All Materials produced by you in connection with your Pedlar Storefront and all IPR in those Materials will remain your property and not become the property of Pedlar."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"5. Confidential Information "}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"You acknowledge that:"}
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you may be provided with brand Materials by Pedlar to assist you in providing the Services; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "if you are provided with brand Materials, you agree that those brand Materials are provided to you on the basis that:"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you will keep the brand Materials strictly confidential and only disclose brand Materials: when compelled by any Law,"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"at which point you will advise Pedlar of this; and"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(b)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you will take all reasonable steps to keep the brand Materials secure."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>

              <Heading6S
                className="tc-head6"
                text={"6. Information "}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"6.1 Agreement to provide Information"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You agree to provide certain personal information to Pedlar as a condition of use of the Pedlar Platform, such as your:"
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"name;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"email address;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"social media handles; and"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(4)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "other information as might be required by Pedlar from time to time, including bank details, address and tax status."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"(together, the Information)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"6.2 Representations and warranties as to Information"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You represent and warrant to Pedlar that the Information provided by you is, and will be at all times, true and accurate in all respects. You must notify Pedlar of any change in circumstances that may cause the Information you have provided to become misleading, inaccurate or untrue. You acknowledge that Pedlar will rely on the Information in performing its obligations under the Agreement and in complying with Laws (including without limitation, any taxation laws) and you hereby indemnify Pedlar for any special incidental, indirect, statutory, exemplary, punitive or consequential damages, including loss of profits, arising out of, or in any way related to the inaccuracy of the Information."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"7. Indemnity and Limitation of Liability"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"7.1 No liability for Pedlar"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Pedlar shall not be liable to you for any damages of any kind arising out of your use of the Pedlar Platform, whether such damage arises directly or indirectly. You agree and understand that the use of the Pedlar Platform is undertaken at your own risk."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"7.2 Indemnity"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You agree to indemnify and hold harmless, Pedlar, its employees, personnel and agents from any and all claims, liabilities, damages, losses and expenses arising out of or in any way connected with any of the following matters:"
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"the content of any Posts you may make;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"your breach of this Agreement;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"your breach of this Agreement;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(4)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"any misrepresentation made by you;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(5)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"your violation of any Laws; and"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 20px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(6)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "any of the warranties and undertakings you have given under this Agreement; whether such matters are alleged or otherwise."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>

              <Heading6S
                className="tc-head6"
                text={"8. Other matters"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"8.1 General warranties and undertakings"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "For as long as you are signed up for the Pedlar Platform:"
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"you undertake that:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "that you are and will be the sole author of all Materials produced by you in the course of providing Services"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "which will be wholly original to you, and not in breach of the rights of any third party, including but not limited to, any IPR;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(b)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you are in compliance with all relevant Laws in the Jurisdiction and any regulations or guidance notes issued "
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "pursuant to or in connection with those Laws and will continue to comply with same;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(c)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you will follow any best practice guidelines endorsed by Pedlar and notified to you from time to time;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(d)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you will not do anything which would defame, tend to defame or could be construed as being defamatory, derogatory"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "or disparaging of Pedlar or any brand or their aﬃliates;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(e)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"any Materials you produce:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(i)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "will be your sole and original work, unless collaboration is necessary or implied, in which case it will be the original"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"work of you and any collaborators;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(ii)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "will not infringe the IPR of any third party or any other proprietary or moral rights of a third party;"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(iii)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"will not infringe any Laws;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(iv)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "will not be defamatory or tend to defame and third party; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 60px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(v)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "will not be obscene, graphic, pornographic, racially or religiously insensitive or in any way discriminatory or offensive,"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"or with the tendency to offend;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(f)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you will not post any obscene, graphic, racially or religiously insensitive or any otherwise discriminatory or content which"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "is offensive or might tend to offend any person, or do any other thing which might have the tendency to offend any person; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"you represent and warrant that:"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 20px 40px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(a)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you have not taken any fraudulent action, or procured that any fraudulent action is taken in relation to your social"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "media channels (including, but not limited to, Facebook, Instagram, Twitter, Tiktok or blog)."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"8.2 Exclusivity"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "You agree to not establish a business in competition with Pedlar or compete (directly or indirectly) with Pedlar in providing services similar to Pedlar, so long as you are signed up for the Pedlar Platform and for a period of 3 months following you removing yourself from the Pedlar Platform. "
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"8.3 Restriction on action"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"So long as you are signed up for the Pedlar Platform:"}
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you agree to not publish any material, whether in print or electronically, make any statement or do any other thing which"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "may tend to defame or bring into disrepute, Pedlar or any brand, product or person/party on the Pedlar Platform, or otherwise say or do anything that is adverse or prejudicial to Pedlar or a brand, or permit any such thing to be done on your behalf; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "you agree to indemnify Pedlar for any costs, losses or liabilities arising out of a breach of paragraph 8.3(1) by you."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"8.4 No relationship"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "For the avoidance of doubt, nothing in this Agreement constitute any relationship of employer and employee, principal and agent or partnership between you and Pedlar. You must not represent yourself as being an employee, agent or partner of Pedlar."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"8.5 Monitoring, suspension and termination of access"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Pedlar reserves the right to generally monitor the Pedlar Platform and all activity through the Pedlar Platform. If you are in breach of this Agreement or Pedlar suspects that you are in breach of this Agreement, or engaged in suspicious, fraudulent, abusive or other activity which Pedlar (in its absolute and exclusive discretion) determines is not in accordance with its values or may be detrimental to its or a brand’s interests) it may choose to suspend or terminate your access to the Pedlar Platform. "
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"9. General"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"9.1 Force Majeure"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Despite any other provision of this agreement, if a party is unable to perform or is delayed in performing an obligation under this agreement by reason of a Force Majeure Event:"
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "that obligation is suspended but only so far and for so long as it is affected by the Force Majeure Event; and"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "the affected party will not be responsible for any loss or expense suffered or incurred by any other party as a result of,"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "and to the extent that, the affected party is unable to perform or is delayed in performing its obligations because of the Force Majeure Event."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"9.2 No waiver"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "No forbearance or delay by Pedlar in exercising or enforcing its rights under the Agreement shall prejudice or restrict the rights of Pedlar to exercise or enforce its rights at a later time and no waiver of any such rights or of any breach of any contractual terms shall be deemed to be a waiver of any other right or of any later breach. Pedlar may only waive a right under the Agreement by doing so in writing."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"9.3 Assignment"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Pedlar may assign its rights under the Agreement by notice to you. You may not assign your rights under this Agreement without the consent of Pedlar (which may be given or withheld in Pedlar’s absolute discretion)."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"9.4 No derogation"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "The rights and remedies provided in this Agreement will not affect any other rights or remedies available to either party."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"9.5 Severability"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "If any provision of the Agreement is unenforceable, illegal or void, that provision is severed and the other provisions of this Agreement remain in force."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"9.6 Jurisdiction"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "This Agreement is governed by the laws of New South Wales and each party submits to the exclusive jurisdiction of the courts of New South Wales and any courts which have jurisdiction to hear appeals from any of those courts and waives any right to object to any proceedings being brought in those courts."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"Schedule – Additional Provisions"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"10. Australia – Privacy"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />

              <Heading6S
                className="tc-head6"
                text={"10.1 Definitions"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={"The following words have the meanings set out below,:"}
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 20px 0"}
              />
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(1)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"Privacy Law means the Privacy Act 1988 (Cth);"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(2)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Privacy Policy means Pedlar’ privacy policy found at"
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"http://pedlar.store/"}
                  color={"#6750A4"}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                  textDecoration={"underline"}
                />
                <Heading6S
                  className="tc-head6"
                  text={"privacy policy;"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <LabelWrapper padding={"0px 0 10px 20px"}>
                <Heading6S
                  className="tc-head6"
                  text={"(3)"}
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 0px"}
                />
                <Heading6S
                  className="tc-head6"
                  text={
                    "Personal Information has the meaning given to that term in the Privacy Law."
                  }
                  color={Colors.black1c}
                  fontWeight={"400"}
                  padding={"0px 0 0px 4px"}
                />
              </LabelWrapper>
              <Heading6S
                className="tc-head6"
                text={"10.2 Personal Information"}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0px 0 20px 0"}
              />
              <Heading6S
                className="tc-head6"
                text={
                  "Where you provide Information to Pedlar, and such Information constitutes Personal Information, Pedlar does not usually, but may disclose that Personal Information to certain third parties in accordance with the Privacy Law. Otherwise, Pedlar will abide by its Privacy Policy."
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0px 0 100px 0"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default TermsConditions;
