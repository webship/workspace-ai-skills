Feature: The AI Skills workspace plugin
  Once the plugin is activated and installed, the ai-skills workspace is on the dashboard, and the
  Plugins page lists the plugin with its four steps.

  Scenario: The workspace page is there
    Given I am on "/ai-skills"
     Then I should see "AI Skills"

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "AI Skills"
      And I should see "@webship/workspace-ai-skills"
