const weatherCodes = {
    0: {
      type: 'sunny',
      description: 'Clear sky'
    },
  
    1: {
      type: 'sunny',
      description: 'Mainly clear'
    },
  
    2: {
      type: 'cloudy',
      description: 'Partly cloudy'
    },
  
    3: {
      type: 'cloudy',
      description: 'Overcast'
    },
  
    45: {
      type: 'cloudy',
      description: 'Fog'
    },
  
    48: {
      type: 'cloudy',
      description: 'Depositing rime fog'
    },
  
    51: {
      type: 'rainy',
      description: 'Light drizzle'
    },
  
    53: {
      type: 'rainy',
      description: 'Moderate drizzle'
    },
  
    55: {
      type: 'rainy',
      description: 'Dense drizzle'
    },
  
    56: {
      type: 'rainy',
      description: 'Light freezing drizzle'
    },
  
    57: {
      type: 'rainy',
      description: 'Dense freezing drizzle'
    },
  
    61: {
      type: 'rainy',
      description: 'Slight rain'
    },
  
    63: {
      type: 'rainy',
      description: 'Moderate rain'
    },
  
    65: {
      type: 'rainy',
      description: 'Heavy rain'
    },
  
    66: {
      type: 'rainy',
      description: 'Light freezing rain'
    },
  
    67: {
      type: 'rainy',
      description: 'Heavy freezing rain'
    },
  
    71: {
      type: 'snowy',
      description: 'Slight snow fall'
    },
  
    73: {
      type: 'snowy',
      description: 'Moderate snow fall'
    },
  
    75: {
      type: 'snowy',
      description: 'Heavy snow fall'
    },
  
    77: {
      type: 'snowy',
      description: 'Snow grains'
    },
  
    80: {
      type: 'rainy',
      description: 'Slight rain showers'
    },
  
    81: {
      type: 'rainy',
      description: 'Moderate rain showers'
    },
  
    82: {
      type: 'rainy',
      description: 'Violent rain showers'
    },
  
    85: {
      type: 'snowy',
      description: 'Slight snow showers'
    },
  
    86: {
      type: 'snowy',
      description: 'Heavy snow showers'
    },
  
    95: {
      type: 'rainy',
      description: 'Thunderstorm'
    },
  
    96: {
      type: 'rainy',
      description: 'Thunderstorm with slight hail'
    },
  
    99: {
      type: 'rainy',
      description: 'Thunderstorm with heavy hail'
    }
  }
  
  export const getWeatherInfo = (code) => {
    return weatherCodes[code] || {
      type: 'cloudy',
      description: 'Unknown weather'
    }
  }