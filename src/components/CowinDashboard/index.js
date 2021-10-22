import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import {
  AppContainer,
  HeaderContainer,
  LogoImage,
  Heading,
  Title,
  FailureContainer,
  FailureImage,
  FailureHeading,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccinationData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getFormattedCoverageDetails = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
  })

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedLast7DaysVaccination = fetchedData.last_7_days_vaccination.map(
        eachDay => this.getFormattedCoverageDetails(eachDay),
      )
      const updatedVaccinationByAge = fetchedData.vaccination_by_age
      const updatedVaccinationByGender = fetchedData.vaccination_by_gender
      this.setState({
        last7DaysVaccinationData: updatedLast7DaysVaccination,
        vaccinationByAgeData: updatedVaccinationByAge,
        vaccinationByGenderData: updatedVaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationDetails = () => {
    const {
      last7DaysVaccinationData,
      vaccinationByAgeData,
      vaccinationByGenderData,
    } = this.state
    return (
      <div>
        <VaccinationCoverage
          last7DaysVaccinationData={last7DaysVaccinationData}
        />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
      </div>
    )
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <FailureHeading>Something went wrong</FailureHeading>
    </FailureContainer>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinDashboard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContainer className="app-container">
        <HeaderContainer className="header-container">
          <LogoImage
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <Heading>Co-WIN</Heading>
        </HeaderContainer>
        <Title>CoWIN Vaccination in India</Title>
        {this.renderCowinDashboard()}
      </AppContainer>
    )
  }
}

export default CowinDashboard
