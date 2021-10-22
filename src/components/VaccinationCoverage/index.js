import {BarChart, XAxis, YAxis, Legend, Bar} from 'recharts'
import {CoverageContainer, CoverageHeading} from './styledComponents'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props
  console.log(last7DaysVaccinationData)
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <CoverageContainer>
      <CoverageHeading>Vaccination Coverage</CoverageHeading>
      <BarChart
        width={900}
        height={400}
        data={last7DaysVaccinationData}
        margin={{top: 5}}
      >
        <XAxis
          datakey="vaccineDate"
          tick={{
            stroke: '#6c757d',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" />
      </BarChart>
    </CoverageContainer>
  )
}

export default VaccinationCoverage
