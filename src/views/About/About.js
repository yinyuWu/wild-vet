import React, { Component } from 'react'
import { Container, Row, Image } from 'react-bootstrap';
import avator from '../../images/user-avator.png'
import './About.css'
class About extends Component {
  constructor(props) {
    super(props);
    const names = ['Dr Emma Hall ', 'Dr Orr Cohen', 
      'Dr. Esther Tarszisz', 'Rosie', 'Vivien', 'Albrina', 'Kylie Walker', 'Charlie Chidiac', 
      'Antonio Astroza', 'Cathie'];
    const texts = [
      'Dr Emma Hall, also known as ‘The Wild Vet’ is our primary veterinarian and has over 15 years’ experience keeping birds and reptiles. In addition to being experienced treating dogs, cats and exotic pets, she has undergone extensive further education in exotic pet medicine and surgery, and has special interests in surgery and cardiology.\n\nDr Emma graduated with first-class honours from the University of New South Wales with a Bachelor of Science in Biological Sciences and Marine Biology in 2011, before studying a Bachelor of Veterinary Science at the University of Sydney and graduating with merit in 2016.\n\nSince then, she has worked at several small animal and exotics clinics around Australia and has been offering a mobile veterinary service since 2018. Emma also has a keen interest in wildlife and spends her spare time tending to injured wildlife and mentoring wildlife carers, leading to her nickname ‘The Wild Vet’.\n\nShe is a strong animal rescue advocate. In addition to most of her pets being rescues, she has organised new homes for many unwanted pets or transported to no-kill shelters.',

      'Dr. Orr Cohen is a lover of all critters great and small. She graduated with first class honours from Charles Sturt University with a Bachelor of Veterinary Biology/Bachelor of Veterinary Science, completing her dissertation in native rodent disease ecology.\n\nOrr has extensive experience working with shelter and rescue animals and has travelled the world volunteering and providing veterinary care to animals worldwide, including in The Galapagos Islands, Fiji and Thailand.',

      'Dr Esther Tarsizsz is a veterinarian with dual interests in all aspects of small animal medicine and surgery. She’s comfortable being a wildlife veterinarian from things as small as possum pouch young, flying foxies, baby birdies, to 1 tonne seals (and everything in between). She brings almost 20 years of small animal, wildlife and emergency animal practice to the mix for The Wild Vet team.\n\nAlong with veterinary science, she has a Masters degree in wildlife health and a PhD in ecology, more specifically pertaining to the interaction of wild Bornean orangutans with their environment (random!). She has spent 3 out of the last 6 summer seasons in Antarctica, anaesthetising southern elephant and Weddell seals for the Sydney Institute of Marine Science as part of a large multi-national oceanographic monitoring project.\n\nWhen at home, she is owned by a very timid and super sweet kitty named Beanie (although rather particular in her food selection demands). Esther also volunteers as the veterinary coordinator for Pets in the Park Darlinghurst, a charity that provides free veterinary care to the pets of people who are homeless (or at risk of homelessness).',

      'Rosie is a full-time nurse at the practice and holds a Certificate 4 in Veterinary Nursing.\n\nShe is passionate about her career in Veterinary Nursing and loves all of her patients. She loves the wide variety of animals we see at the clinic from dogs and cats to snakes and turtles. She also enjoys the relationships that she gets to build with our clients.\n\nDuring her spare time, she enjoys being with her fiancé and their 10 fur babies. She also enjoys travelling and taking the animals on adventures.',

      'Vivien completed her Certificate IV in Veterinary Nursing in Darwin before moving to Sydney. During her time in Darwin, she worked closely with exotics and wildlife where she developed a special interest in caring for and treating feathered and scaled critters.\n\nVivien enjoys coming into work and being a part of a friendly, hardworking, and experienced team of vets and nurses.',

      'As the only one in her family to have a real passion for animals, Albrina had always been seeking pets and wanting to help animals but hadn’t had the chance to pursue that love with the time committed as a former international figure skater. Upon graduating a Bachelor of Design from the University of New South Wales, she decided it wasn’t the career for her and it was time to return to that one thing she’d always been passionate about; that is, animals.\n\nAs a registered senior veterinary nurse at The Wild Vet with a background in small animal general and specialist practice, she hopes to maintain a level of gold standard care, and promises plenty of love and the best of care for any critter that come through the door.',

      'TBA.',

      'Charlie is currently completing an honours project in veterinary bioscience at the University of Sydney and is also on the way to completing the Certificate IV in Veterinary Nursing with AIRC.\n\nCharlie has 2 years experience in bird and exotic practice, as well has almost 6 years volunteer and nursing experience in several small animal clinics across Sydney. He has also completed an internship with a rural wildlife vet in South Africa in 2019 and is an active member of WIRES, where he lives out his passion for wildlife health and welfare. In addition to this, he has special interests in surgery, diagnostic imaging and exotic animal health (especially birds, reptiles and fish).',

      'TBA.',

      'Cathie has over 30yrs experience as a human Cardiac Sonographer with a background in Cardiac Nursing and Cardiopulmonary technology.\n\nShe has recently crossed over to the world of animals, and is putting her human experience to use with dogs and cats.Cathie loves all furry four legged friends and is bound to be cuddling and playing with all our patients as well as sneaking them treats.']
    let staff = [];
    for (let i = 0; i < names.length; i++) {
      staff.push({
        name: names[i],
        desc: texts[i]
      })
    }
    this.state = {
      staff
    }
  }

  render() {
    return (
      <div className="about">
        <Container>
          <Row>
            <h1 className="about-title">About Us</h1>
          </Row>
          <Row>
            <div className="about-header"><i>Our Staff</i></div>
          </Row>
          {this.state.staff.map((staff, index) => {
            return (<div key={index} className="about-item">
              <h3 className="about-item-name">{staff.name}</h3>
              <Image width={100} height={100} src={avator} className="about-item-img" roundedCircle />
              <p>{staff.desc}</p>
              <hr />
            </div>)
          })}

          <Row>
            <div className="about-header"><i>OUR COMMITMENT</i></div>
          </Row>
          <div className="about-content">
            <h2 className="about-content-title">To You</h2>
            <p>
              The moment you enter our clinic, your pet will be treated as a member of our extended family.
            </p>
            <p>
              We endeavour to get to know you and your pets to the best of our ability, and their wellbeing is our number one priority. You can expect us to remember your pet’s birthday, when their vaccination and parasite prevention is due, how you like your coffee (or tea), and the names of your other family members. We understand that you lead a busy life, so we want you to know that we have your pet’s health needs covered.
            </p>
            <p>
              We offer a personalised experience which is not offered by many veterinary clinics, not a ‘one-size-fits-all’ approach. Owners are involved in every aspect of your pet’s diagnostic workup and treatment plan, and we will equip you with detailed handouts so that you have a thorough understanding of all aspects of your pet’s illness. Upon hospital discharge, all test results are discussed in detail; and each pet is sent home with a discharge letter explaining all treatments your pet received.
            </p>
            <p>
              We also offer wellness plans for clients wanting to ensure that their pet receives the highest standard of care (at a significantly discounted price!).
            </p>
            <hr />
            <h2 className="about-content-title">To Your Pets</h2>
            <p>
              You may notice that our consultation process is different to most veterinary clinics. We have restructured our hospital to mimic that of human hospitals,  streamlining the consultation process and allowing your pet to be seen with minimal waiting time.
            </p>
            <p>
              Our experienced nurses are trained to detect any serious illnesses, and to gain a thorough history of your pet. This will screen for emergencies, and ensure that the time spent with your chosen veterinarian is spent focusing  on the examination and diagnostics.
            </p>
            <p>
              We believe in creating a fear-free space for your pet, and we understand that veterinary visits are often a stressful time for your pet. In order to minimise stress, we have taken several measures to ensure your pet feels as comfortable as possible during their visit. These measures include separate dog/cat/exotics waiting areas and consultation rooms, an assortment of tasty treats to distract your pet during uncomfortable procedures, pheromone diffusers in each room, comfy bedding in hospital cages, and most importantly – lots of cuddles!
            </p>
            <hr />
            <h2 className="about-content-title">To The Environment</h2>
            <h3 className="about-content-subtitle">Paperless Practice</h3>
            <p>
              At The Wild Vet we are committed to minimising our environmental impact. Our clinic is almost entirely paperless, therefore all consent forms and receipts are completed digitally. If you would prefer a hard copy of any of your pet’s paperwork, we are happy to oblige – just ask one of our friendly staff!
            </p>
            <h3 className="about-content-subtitle">Soft Plastic Recycling Collection Point</h3>
            <p>
              Unfortunately pet food packaging can generate a significant amount of soft plastic waste, which cannot be recycled in household bins. Which is why we offer a recycling service for pet-food related soft plastics. Simply bring your empty food bags and as a token of our appreciation, we will give you a 5% discount off your next pet food purchase*
            </p>
            <p>
              *Discount applicable to same-day purchases
            </p>
            <h3 className="about-content-subtitle">Minimising Plastic Use</h3>
            <p>
              At The Wild Vet, we aim to minimise plastic use whenever possible. Medications are dispensed in environmentally-friendly packaging wherever possible, and our pet shop is stocked with products containing biodegradable packaging wherever possible
            </p>

          </div>

        </Container>
      </div>
    )
  }
}

export default About;