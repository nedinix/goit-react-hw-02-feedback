import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './feedback.module.css';

export class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  static propTypes = {
    state: PropTypes.arrayOf(
      PropTypes.exact({
        good: PropTypes.number,
        neutral: PropTypes.number,
        bad: PropTypes.number,
      })
    ),
  };

  onCountStateGood = () => {
    this.setState(prevState => ({
      good: prevState.good + 1,
    }));
    this.onCountTotalFeedback();
  };

  onCountStateNeutral = () => {
    this.setState(prevState => ({
      neutral: prevState.neutral + 1,
    }));
    this.onCountTotalFeedback();
  };

  onCountStateBad = () => {
    this.setState(prevState => ({
      bad: prevState.bad + 1,
    }));
    this.onCountTotalFeedback();
  };

  onCountTotalFeedback = () => {
    this.setState(prevState => ({
      total: Object.values(prevState)
        .slice(0, 3)
        .reduce((acc, value) => acc + value, 0),
    }));
    this.onCountPositiveFeedbackPercentage();
  };

  onCountPositiveFeedbackPercentage = () => {
    this.setState(prevState => {
      const result = Number.parseInt((prevState.good / prevState.total) * 100);
      return {
        positivePercentage: `${result}%`,
      };
    });
  };

  render() {
    return (
      <div className={css.container}>
        <FeedbackOptions
          stateGood={this.onCountStateGood}
          stateNeutral={this.onCountStateNeutral}
          stateBad={this.onCountStateBad}
        />
        <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={this.state.total}
          positivePercentage={this.state.positivePercentage}
        />
      </div>
    );
  }
}
