import {PieChart, Pie, Cell, Legend} from 'recharts'
import {GenderContainer, GenderHeading} from './styledComponents'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  console.log(vaccinationByGenderData)
  return (
    <GenderContainer>
      <GenderHeading>Vaccination by gender</GenderHeading>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          date={vaccinationByGenderData}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
        />
      </PieChart>
    </GenderContainer>
  )
}

export default VaccinationByGender
