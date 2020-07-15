export const timeChartComponent = (initial) => {
  const timeChart = `<svg viewBox="0 0 36 36" class="circular-chart">
                        <path class="circle"
                            stroke-dasharray="0, 60"
                            d="M18 8.4507
                            a 9.5493 9.5493 0 0 1 0 19.0986
                            a 9.5493 9.5493 0 0 1 0 -19.0986"
                        />
                        <text x="18" y="20.35" class="percentage">${initial}</text>
                    </svg>`;
  return timeChart;
};
